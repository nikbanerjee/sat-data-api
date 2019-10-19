FROM ubuntu:latest
EXPOSE 9001
RUN apt update
RUN apt install -y curl lsb-release gnupg
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs
COPY ./ /fractal-boilerplate
WORKDIR /fractal-boilerplate
RUN npm i
CMD ["npm", "start"]