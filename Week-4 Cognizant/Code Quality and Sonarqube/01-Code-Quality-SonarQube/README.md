# SonarQube & Code Quality

## Objective
Integrate static analysis with SonarQube, learn about code smells, and write clean, maintainable code.

## Technologies Used
- Java 21
- Maven
- SonarQube Maven Scanner

## Project Structure
- `smells`: Demonstrates code violations (raw types, unclosed resources, direct printStackTrace, nested conditions).
- `clean`: Implements refactored clean version of the code utilizing generic collections, try-with-resources, switch expression, static logging.
- `sonar-project.properties`: Scanner metrics boundaries.

## How to Run SonarQube Scan
1. Start your local SonarQube server (typically available at `http://localhost:9000`).
2. Run the maven analyzer command:
   ```bash
   mvn clean verify sonar:sonar -Dsonar.token=<YOUR_SONAR_TOKEN>
   ```
