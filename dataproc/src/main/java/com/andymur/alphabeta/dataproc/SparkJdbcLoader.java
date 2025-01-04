package com.andymur.alphabeta.dataproc;

import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class SparkJdbcLoader {

    @Value("${spring.datasource.url}")
    private String jdbcUrl;

    @Value("${spring.datasource.username}")
    private String jdbcUsername;

    @Value("${spring.datasource.password}")
    private String jdbcPassword;

    @Value("${app.datasource.tableName}")
    private String tableName;

    public void load() {
        SparkSession spark = SparkSession.builder()
                .appName("PostgreSQL to Spark")
                .master("local[*]") // Use local cluster
                .config("spark.ui.enabled", "false") // Disable Spark UI
                .getOrCreate();
        try {
            // PostgreSQL JDBC connection properties
            Map<String, String> connectionProperties = new HashMap<>();
            connectionProperties.put("user", jdbcUsername);
            connectionProperties.put("password", jdbcPassword);
            connectionProperties.put("driver", "org.postgresql.Driver");

            // Load data from PostgreSQL into a Spark DataFrame
            Dataset<Row> usersDF = spark.read()
                    .format("jdbc")
                    .option("url", jdbcUrl)
                    .option("dbtable", tableName)
                    .options(connectionProperties)
                    .load();

            // Show the DataFrame content
            usersDF.show();
        } finally {
            // Stop the Spark session
            spark.stop();
        }
    }
}
