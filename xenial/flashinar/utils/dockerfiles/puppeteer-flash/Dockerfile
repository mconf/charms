# https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#running-puppeteer-in-docker
# Build the container:
# docker build -t puppeteer-flash .
# Run the container by passing node -e "<yourscript.js content as a string> as the command:
#  docker run -i --rm --cap-add=SYS_ADMIN \
#    --name puppeteer-flash puppeteer-flash:latest \
#    xvfb-run node -e "`cat yourscript.js`"

FROM node:8-slim

# See https://crbug.com/795759
RUN apt-get update && apt-get install -yq libgconf-2-4

# Install latest chrome dev package and fonts to support major charsets (Chinese, Japanese, Arabic, Hebrew, Thai and a few others)
# Note: this installs the necessary libs to make the bundled version of Chromium that Puppeteer
# installs, work.
RUN apt-get update && apt-get install -y wget --no-install-recommends \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst ttf-freefont \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get purge --auto-remove -y curl \
    && rm -rf /src/*.deb

# It's a good idea to use dumb-init to help prevent zombie chrome processes.
ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init

# Uncomment to skip the chromium download when installing puppeteer. If you do,
# you'll need to launch puppeteer with:
#     browser.launch({executablePath: 'google-chrome-unstable'})
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Install puppeteer so it's available in the container.
RUN npm i puppeteer

# Add user so we don't need --no-sandbox.
RUN groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser \
    && mkdir -p /home/pptruser/Downloads

# Copy chrome config
# This will manage to automatically load Pepper Flash when running the test
RUN mkdir -p /home/pptruser/.config
COPY ./config/google-chrome-config.tar.gz /home/pptruser
RUN tar -xzvf /home/pptruser/google-chrome-config.tar.gz -C /home/pptruser/.config \
    && rm -f /home/pptruser/google-chrome-config.tar.gz

RUN apt-get update && apt-get install -y --no-install-recommends apt-utils \
    && DEBIAN_FRONTEND=noninteractive apt-get install --fix-missing -y xvfb

RUN chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /node_modules

# Run everything after as non-privileged user.
USER pptruser

ENTRYPOINT ["dumb-init", "--"]
CMD ["google-chrome-unstable"]
