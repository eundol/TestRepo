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

public class FreeBoardServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public FreeBoardServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		System.out.println("FreeBoardServlet Start **");
	    request.setCharacterEncoding( "utf-8" );   
        response.setContentType("text/html; charset=utf-8"); 
	    //사실 별필요 없음
		
		ArrayList<BoardEntity> board = new ArrayList<BoardEntity>();
		BoardBiz biz = new BoardBiz();
		biz.getBoard(board);

		request.setAttribute("board", board);
		RequestDispatcher view = request.getRequestDispatcher("board/freeboard.jsp");
		System.out.println("go to board/freeboard.jsp");
		
		view.include(request, response);
	}
}
