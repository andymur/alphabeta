1. Use Spring Initializr https://start.spring.io/

- Open [Spring Initializr]([url](https://start.spring.io/)) in your browser.
- Configure the project:
- Project: Maven
- Language: Java
- Spring Boot Version: 3.x.x (choose the latest stable release)
- Group: com.andymur (or your preferred group ID)
- Artifact: alphabeta (or your preferred artifact ID)
- Name: alphabeta
- Description: A Spring Boot 3.x project
- Package Name: Auto-generated based on Group and Artifact
- Packaging: Jar
- Java Version: 17+ (Spring Boot 3.x requires Java 17 or higher)
- Add dependencies:
- Spring Boot DevTools (optional, for hot reload)
- Spring Web (for building RESTful APIs)
- Spring Data JPA (for working with databases)
- H2 Database (or another database like MySQL or PostgreSQL if needed)
- Click on Generate to download a pre-configured Maven project.

2.  Unzip and Import the Project
- Unzip the downloaded project.
- Open your favorite IDE (e.g., IntelliJ IDEA, Eclipse, or VS Code).
- Import the project as a Maven project.

3. Run the Application
- Navigate to the project directory using console
- Run the following Maven command:
mvn spring-boot:run
- Alternatively, you can run the main class directly from your IDE.

4. Test the Application
- By default, Spring Boot will start a web server (e.g., Tomcat) on port 8080.
- Test the REST API by adding a sample controller in src/main/java/com/andymur/alphabeta.
