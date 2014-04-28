package controller;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import entity.PiChart;

import biz.TrackerBiz;

/**
 * Servlet implementation class tSummaryPiChart
 */
public class SummaryPiChartServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public SummaryPiChartServlet() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		System.out.println("Summary Servlet start");	// console log
 
        
		TrackerBiz biz = new TrackerBiz();	// create biz object
		ArrayList<PiChart> piChartList = biz.getSummaryPiChart();
		System.out.println("##### piChartList : "+piChartList);
		
		request.setAttribute("piChartList", piChartList);
		System.out.println("setAttribute okay :D");
		
		RequestDispatcher view = request.getRequestDispatcher("tPiChart.jsp");
		view.include(request, response);
		//view.forward(request, response);
		
	}

}
