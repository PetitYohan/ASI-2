#
# Packaging stage
#
FROM adoptopenjdk/openjdk11:x86_64-alpine-jdk-11.0.10_9-slim
# COPY --from=build /home/app/target/*.jar app.jar
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
EXPOSE 8081
ENTRYPOINT ["java","-jar","/app.jar"]
