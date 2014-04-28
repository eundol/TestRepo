package controller;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import biz.GerritBiz;
import entity.ChangeInfo;

public class OpenChangeListServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public OpenChangeListServlet() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("sevlet start!");
	    request.setCharacterEncoding( "euc-kr" );   
        response.setContentType("text/html; charset=euc-kr"); 
	    //사실 별필요 없음
        
        String project = (String) request.getParameter("project");
		System.out.println("project : " + project);
		//get방식으로 project파라미터 확인
		
		GerritBiz biz = new GerritBiz();
		ArrayList<ChangeInfo> openList = biz.getOpenList(project);
		System.out.println("openList : " + openList);
		
		request.setAttribute("List", openList);
		request.setAttribute("project", project);
		request.setAttribute("status", "Open");
		RequestDispatcher view = request.getRequestDispatcher("changeList.jsp");
		view.forward(request, response);
	}

}
