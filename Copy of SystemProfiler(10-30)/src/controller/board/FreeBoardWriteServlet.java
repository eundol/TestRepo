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
	    //사실 별필요 없음
        
        String writer = request.getParameter("writer"); //파라미터에서 정보 받음
        String pwd = request.getParameter("pwd"); //파라미터에서 정보 받음
        String content = request.getParameter("content"); //파라미터에서 정보 받음
        BoardBiz biz = new BoardBiz();
        	
    	biz.writeBoard(writer, pwd, content);
        	
		RequestDispatcher view = request.getRequestDispatcher("board/success.html");
		System.out.println("go to board/success.html");
		view.include(request, response);
    	
	}
}