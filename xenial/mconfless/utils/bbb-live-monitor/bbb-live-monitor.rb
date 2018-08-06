# Set encoding to utf-8
# encoding: UTF-8

require 'rubygems'
require 'redis'
require 'json'

def every_so_many_seconds(seconds)
  last_tick = Time.now
  loop do
    sleep 0.1
    if Time.now - last_tick >= seconds
      last_tick += seconds
      yield
    end
  end
end

$redis = Redis.new(:timeout => 0)
$meetings = {}
$stats = {
  :num_meetings => 0,
  :num_users => 0,
  :num_bots => 0,
  :num_voice_participants => 0,
  :num_voice_listeners => 0,
  :num_videos => 0,
  :num_screenshares => 0,
}

STDOUT.sync = true

puts "date,num_meetings,num_users,num_bots,num_voice_participants,num_voice_listeners,num_videos,num_screenshares"
Thread.new do
  every_so_many_seconds(1) do
    puts "#{Time.now.strftime('%d-%m %T')},#{$stats[:num_meetings]},#{$stats[:num_users]},#{$stats[:num_bots]},#{$stats[:num_voice_participants]},#{$stats[:num_voice_listeners]},#{$stats[:num_videos]},#{$stats[:num_screenshares]}"
  end
end

$redis.subscribe('from-akka-apps-redis-channel') do |on|
  on.message do |channel, msg|
    data = JSON.parse(msg)
    header = data['core']['header']
    body = data['core']['body']
    type = header['name']
    case type
    when "MeetingCreatedEvtMsg"
      meeting_prop = body['props']['meetingProp']
      meeting_id = meeting_prop['intId']
      if not $meetings.has_key?(meeting_id)
        meeting = {
          :users => {},
          :screenshare => false
        }
        $meetings[meeting_id] = meeting
      end
    when "MeetingDestroyedEvtMsg"
      meeting_id = body['meetingId']
      if $meetings.has_key?(meeting_id)
        $meetings.delete(meeting_id)
      end
    when "UserJoinedMeetingEvtMsg"
      meeting_id = header['meetingId']
      userid = header['userId']
      if $meetings.has_key?(meeting_id) and not $meetings[meeting_id][:users].has_key?(userid)
        user = {
          :listenOnly => false,
          :voiceUser => false,
          :videos => [],
          :bot => body['name'].downcase.start_with?('bot')
        }
        $meetings[meeting_id][:users][userid] = user
      end
    when "UserLeftMeetingEvtMsg"
      meeting_id = header['meetingId']
      userid = header['userId']
      if $meetings.has_key?(meeting_id) and $meetings[meeting_id][:users].has_key?(userid)
        $meetings[meeting_id][:users].delete(userid)
      end
    when "UserJoinedVoiceConfToClientEvtMsg"
      meeting_id = header['meetingId']
      userid = header['userId']
      if $meetings.has_key?(meeting_id) and $meetings[meeting_id][:users].has_key?(userid)
        $meetings[meeting_id][:users][userid][:listenOnly] = body['listenOnly']
        $meetings[meeting_id][:users][userid][:voiceUser] = !body['listenOnly']
      end
    when "UserLeftVoiceConfToClientEvtMsg"
      meeting_id = header['meetingId']
      userid = header['userId']
      if $meetings.has_key?(meeting_id) and $meetings[meeting_id][:users].has_key?(userid)
        $meetings[meeting_id][:users][userid][:listenOnly] = false
        $meetings[meeting_id][:users][userid][:voiceUser] = false
      end
    when "UserBroadcastCamStartedEvtMsg"
      meeting_id = header['meetingId']
      userid = header['userId']
      if $meetings.has_key?(meeting_id) and $meetings[meeting_id][:users].has_key?(userid)
        $meetings[meeting_id][:users][userid][:videos] = body['stream'].split(',')
      end
    when "UserBroadcastCamStoppedEvtMsg"
      meeting_id = header['meetingId']
      userid = header['userId']
      if $meetings.has_key?(meeting_id) and $meetings[meeting_id][:users].has_key?(userid)
        $meetings[meeting_id][:users][userid][:videos] = []
      end
    when "ScreenshareRtmpBroadcastStartedEvtMsg"
      meeting_id = header['meetingId']
      if $meetings.has_key?(meeting_id)
        $meetings[meeting_id][:screenshare] = true
      end
    when "ScreenshareRtmpBroadcastStoppedEvtMsg"
      meeting_id = header['meetingId']
      if $meetings.has_key?(meeting_id)
        $meetings[meeting_id][:screenshare] = false
      end
    end

    $stats[:num_meetings] = $meetings.length
    $stats[:num_users] = $meetings.inject(0) { |total, (k, v)| total + v[:users].length}
    $stats[:num_bots] = $meetings.inject(0) { |total, (k, v)| total + v[:users].values.select { |u| u[:bot] }.length }
    $stats[:num_voice_participants] = $meetings.inject(0) { |total, (k, v)| total + v[:users].values.select { |u| u[:voiceUser] }.length }
    $stats[:num_voice_listeners] = $meetings.inject(0) { |total, (k, v)| total + v[:users].values.select { |u| u[:listenOnly] }.length }
    $stats[:num_videos] = $meetings.inject(0) { |total, (k, v)| total + v[:users].inject(0) { |total, (k, v)| total + v[:videos].length } }
    $stats[:num_screenshares] = $meetings.inject(0) { |total, (k, v)| total + (v[:screenshare] ? 1 : 0) }
  end
end
