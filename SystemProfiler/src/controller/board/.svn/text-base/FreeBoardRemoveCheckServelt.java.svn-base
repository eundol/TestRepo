package controller.board;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import entity.BoardEntity;

import biz.BoardBiz;

public class FreeBoardRemoveCheckServelt extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public FreeBoardRemoveCheckServelt() {
        super();
    }

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("FreeBoardRemoveCheckServelt Start **");
	    request.setCharacterEncoding( "utf-8" );   
        response.setContentType("text/html; charset=utf-8"); 
	    //사실 별필요 없음

        String id = request.getParameter("id"); //파라미터에서 정보 받음
		ArrayList<BoardEntity> board = new ArrayList<BoardEntity>();
        BoardBiz biz = new BoardBiz();
        biz.getBoardbyId(board, id);
        
        //password 확인
        if(board.get(0).getPwd().equals(request.getParameter("pwd"))){
        	System.out.println("correct :D");
        	
        	int flag = biz.deleteBoard(request.getParameter("id"));
        	
        	if(flag == 1){ //remove success
        		RequestDispatcher view = request.getRequestDispatcher("board/correct.html");
        		System.out.println("go to /board/correct.html");
        		view.include(request, response);
        	}else{
        		RequestDispatcher view = request.getRequestDispatcher("board/error.html");
        		System.out.println("go to /board/error.html");
        		view.include(request, response);
        	}
        	
        }else{ //incorrect
        	System.out.println("incorrect :(");
    		RequestDispatcher view = request.getRequestDispatcher("board/incorrect.html");
    		System.out.println("go to /board/incorrect.html");
    		view.include(request, response);
        }
	}
}
