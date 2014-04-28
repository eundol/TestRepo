package controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import entity.TableRanking;
import biz.TrackerBiz;

/**
 * Servlet implementation class ComponentCreateRankingServlet
 */
public class ComponentCreateRankingServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
    
	public ComponentCreateRankingServlet() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("Component CreateRanking Servlet start");	// console log
        
		TrackerBiz biz = new TrackerBiz();	// create biz object
		TableRanking tableRanking = biz.getComponentTableRanking();
		
		request.setAttribute("tableRanking", tableRanking);
		System.out.println("setAttribute okay :D");
		
		RequestDispatcher view = request.getRequestDispatcher("tTableRanking.jsp");
		view.include(request, response);	

		System.out.println("Component Table Servlet fininsh");
	
	}
}
