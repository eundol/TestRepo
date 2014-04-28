#!/bin/sh

JAVA_HOME=/usr/lib/jvm/java-6-sun
export JAVA_HOME
export PATH=$PATH:$JAVA_HOME/bin
export CLASSPATH=".:..:$CLASSPATH:$JAVA_HOME/jre/lib:/usr/local/mysql-jdbc/mysql-connector-java-5.1.22-bin.jar:$JAVA_HOME/jre/bin"

#get issue data from url.
curl http://seti.lge.com/cgi/swp/issue.cgi > issue.xml

# 1. xml parsing
# 2. insert to DB (issue table) 
java IssuePusher

echo test success.
