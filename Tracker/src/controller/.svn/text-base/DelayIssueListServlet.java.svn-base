package controller;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import biz.TrackerBiz;
import entity.DelayIssue;

public class DelayIssueListServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public DelayIssueListServlet() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
        request.setCharacterEncoding( "euc-kr" );   
        response.setContentType("text/html; charset=euc-kr"); 
        //사실 별필요 없음
        
		System.out.println("DelayIssueListServlet start!");
		String project = (String) request.getParameter("project");
		System.out.println("project : " + project);
		//get방식으로 project파라미터 확인
		
		TrackerBiz biz = new TrackerBiz();
		ArrayList<DelayIssue> delayIssueList = biz.getDelayIssue(project);
		System.out.println("delayIssueList : " + delayIssueList);
		//->biz->dao 해당 프로젝트의 delayIssueList리턴
		
		request.setAttribute("delayIssueList", delayIssueList);
		request.setAttribute("project", project);
		RequestDispatcher view = request.getRequestDispatcher("delayedIssue.jsp");
		view.forward(request, response);
		
	}
}
