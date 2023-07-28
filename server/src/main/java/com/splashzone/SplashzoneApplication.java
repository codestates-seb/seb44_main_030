package com.splashzone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@EnableCaching
@SpringBootApplication
public class SplashzoneApplication {

	public static void main(String[] args) {
		SpringApplication.run(SplashzoneApplication.class, args);
	}

}
