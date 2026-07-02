package com.library.aspect;

import org.aspectj.lang.ProceedingJoinPoint;

public class LoggingAspect {

    public Object logExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {

        long start = System.currentTimeMillis();

        System.out.println("Method Started : " + joinPoint.getSignature().getName());

        Object result = joinPoint.proceed();

        long end = System.currentTimeMillis();

        System.out.println("Method Finished : " + joinPoint.getSignature().getName());

        System.out.println("Execution Time : " + (end - start) + " ms");

        return result;
    }
}