package com.example.xpSearchLiang;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.britesnow.snow.util.PackageScanner;
import com.britesnow.snow.web.binding.EntityClasses;
import com.google.inject.AbstractModule;
import com.google.inject.Provides;
import com.google.inject.Singleton;

/**
 * TODO: Rename the package and the class name to fit your application naming convention and 
 * update /webapp/WEB-INF/snow.properties "snow.webApplicationModules" accordingly 
 * 
 * TODO: add/remove bindings to fit your application's need
 * 
 */
public class AppConfig extends AbstractModule {
    private static Logger log = LoggerFactory.getLogger(AppConfig.class);
    
    @Override
    protected void configure() {
       // bind(AuthRequest.class).to(AppAuthRequest.class);
    }
}
