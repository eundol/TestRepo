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
 * Servlet implementation class SummaryCreateRankingServlet
 */
public class SummaryCreateRankingServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
    
	public SummaryCreateRankingServlet() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("Summary CreateRanking Servlet start");	// console log
        
		TrackerBiz biz = new TrackerBiz();	// create biz object
		TableRanking tableRanking = biz.getSummaryTableRanking();
		
		request.setAttribute("tableRanking", tableRanking);
		System.out.println("setAttribute okay :D");
		
		RequestDispatcher view = request.getRequestDispatcher("tTableRanking.jsp");
		view.include(request, response);	

		System.out.println("Summary Table Servlet fininsh");
	
	}
}
