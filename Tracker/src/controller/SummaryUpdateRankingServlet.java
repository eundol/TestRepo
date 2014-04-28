package controller;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import entity.TableRanking;

import biz.TrackerBiz;

/**
 * Servlet implementation class ProductTableServlet
 */
public class SummaryUpdateRankingServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
   public SummaryUpdateRankingServlet() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("Summary CreateRanking Servlet start");	// console log
        
		TrackerBiz biz = new TrackerBiz();	// create biz object
		TableRanking tableUpdateRanking = biz.getSummaryTableUpdateRanking();
		
		request.setAttribute("tableUpdateRanking", tableUpdateRanking);
		System.out.println("setAttribute okay :D");
		
		RequestDispatcher view = request.getRequestDispatcher("tTableUpdateRanking.jsp");
		view.include(request, response);	

		System.out.println("Summary Table Servlet fininsh");
	}
}
