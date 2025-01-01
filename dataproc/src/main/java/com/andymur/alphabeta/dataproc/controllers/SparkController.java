package com.andymur.alphabeta.dataproc.controllers;

import com.andymur.alphabeta.dataproc.SparkJdbcLoader;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/spark")
class SparkController {

    private final SparkJdbcLoader sparkJdbcLoader;

    public SparkController(SparkJdbcLoader sparkJdbcLoader) {
        this.sparkJdbcLoader = sparkJdbcLoader;
    }

    @GetMapping("/load-data")
    public String loadData() {
        try {
            sparkJdbcLoader.load();
            return "Data loaded successfully!";
        } catch (Exception e) {
            return "Failed to load data: " + e.getMessage();
        }
    }
}