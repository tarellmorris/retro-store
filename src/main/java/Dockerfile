FROM eclipse-temurin:25-jdk-alpine
ARG JAR_FILE=build/libs/*.jar
WORKDIR /app
COPY ${JAR_FILE} app.jar
CMD ["java", "-jar", "app.jar"]