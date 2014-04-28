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

public class FullChangeListServelt extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public FullChangeListServelt() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("sevlet start!");
	    request.setCharacterEncoding( "euc-kr" );   
        response.setContentType("text/html; charset=euc-kr"); 
	    //��� ���ʿ� ����
        
        String project = (String) request.getParameter("project");
		System.out.println("project : " + project);
		//get������� project�Ķ���� Ȯ��
		
		GerritBiz biz = new GerritBiz();
		ArrayList<ChangeInfo> fullList = biz.getFullList(project);
		System.out.println("fullList : " + fullList);
		
		request.setAttribute("fullList", fullList);
		request.setAttribute("project", project);
		request.setAttribute("status", "Total");
		RequestDispatcher view = request.getRequestDispatcher("fullChangeList.jsp");
		view.forward(request, response);
	}

}
