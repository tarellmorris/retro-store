# Use a slimmed OpenJDK image for better efficiency
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the application JAR file from your project's target directory into the container
COPY target/my-spring-boot-app.jar app.jar

# Command to run the application when the container starts
CMD ["java", "-jar", "app.jar"]