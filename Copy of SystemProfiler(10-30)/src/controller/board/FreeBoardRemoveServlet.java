package controller.board;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class FreeBoardRemoveServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public FreeBoardRemoveServlet() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("FreeBoardRemoveServlet Start **");
	    request.setCharacterEncoding( "utf-8" );   
        response.setContentType("text/html; charset=utf-8"); 
	    //사실 별필요 없음
        
        String id = request.getParameter("id");
        System.out.println("id : " + id);
		request.setAttribute("id", id);
		
		RequestDispatcher view = request.getRequestDispatcher("board/check_password.jsp");
		System.out.println("go to board/check_password.jsp");
		view.include(request, response);
	}
}
