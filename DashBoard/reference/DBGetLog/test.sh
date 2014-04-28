#!/bin/sh

JAVA_HOME=/usr/lib/jvm/java-6-sun
export JAVA_HOME
export PATH=$PATH:$JAVA_HOME/bin

export CLASSPATH=".:..:$CLASSPATH:$JAVA_HOME/jre/lib:/usr/local/mysql-jdbc/mysql-connector-java-5.1.22-bin.jar:$JAVA_HOME/jre/bin"

java DBTest

