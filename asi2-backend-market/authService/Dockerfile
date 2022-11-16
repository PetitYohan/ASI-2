
#
# Build stage
#
# FROM maven:3.6.0-jdk-11-slim AS build
# COPY src /home/app/src
# COPY pom.xml /home/app
# RUN mvn -f /home/app/pom.xml clean package

#
# Packaging stage
#
FROM adoptopenjdk/openjdk11:x86_64-alpine-jdk-11.0.10_9-slim
# COPY --from=build /home/app/target/*.jar app.jar
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
EXPOSE 8083
ENTRYPOINT ["java","-jar","/app.jar"]