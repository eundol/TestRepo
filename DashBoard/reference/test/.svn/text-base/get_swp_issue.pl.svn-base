#!/usr/bin/perl

use Socket qw(:DEFAULT :crlf);

$server = "seti.lge.com";
$port = "80";
$request = "/cgi/swp/issue.cgi";

sub tcp_connect
{
    local($host,$port) =@_;
    $sockaddr='S n a4 x8';
    chop($hostname=`hostname`);
    $port=(getservbyname($port, 'tcp'))[2]  unless $port =~ /^\d+$/;
    $me=pack($sockaddr,&AF_INET,0,(gethostbyname($hostname))[4]);
    $them=pack($sockaddr,&AF_INET,$port,(gethostbyname($host))[4]);
    socket(S,&PF_INET,&SOCK_STREAM,(getprotobyname('tcp'))[2]) || 
            die "socket: $!";
    bind(S,$me) || return "bind: $!";
    connect(S,$them) || return "connect: $!";
    select(S);
    $| = 1;
    select(stdout);
    return "";
}

### Main

{
    $res=&tcp_connect($server,$port);

    print S "GET $request\n";
    while (<S>) {
        print;
    }
}
