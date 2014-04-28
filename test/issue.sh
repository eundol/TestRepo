#!/bin/sh


PATH=$PATH:$JAVA_HOME/bin
export JAVA_HOME=/usr/local/jdk
export PATH=$PATH:$JAVA_HOME/bin
export CLASSPATH=".:..:$CLASSPATH:$JAVA_HOME/jre/lib:/usr/local/mysql-jdbc/mysql-connector-java-5.1.22-bin.jar:$JAVA_HOME/jre/lib/ext:$JAVA_HOME/jre/bin"

#get issue data from url.
curl http://seti.lge.com/cgi/swp/issue.cgi > /test/issue.xml

# 1. xml parsing
# 2. insert to DB (issue table) 
java IssuePusher

echo test success.
