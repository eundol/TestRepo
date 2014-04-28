package controller.board;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import biz.BoardBiz;
import entity.BoardEntity;

public class FreeBoardWriteServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public FreeBoardWriteServlet() {
        super();
    }

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("FreeBoardWriteServlet Start **");
	    request.setCharacterEncoding( "utf-8" );   
        response.setContentType("text/html; charset=utf-8"); 
	    //��� ���ʿ� ����
        
        String writer = request.getParameter("writer"); //�Ķ���Ϳ��� ���� ����
        String pwd = request.getParameter("pwd"); //�Ķ���Ϳ��� ���� ����
        String content = request.getParameter("content"); //�Ķ���Ϳ��� ���� ����
        BoardBiz biz = new BoardBiz();
        	
    	biz.writeBoard(writer, pwd, content);
        	
		RequestDispatcher view = request.getRequestDispatcher("board/success.html");
		System.out.println("go to board/success.html");
		view.include(request, response);
    	
	}
}