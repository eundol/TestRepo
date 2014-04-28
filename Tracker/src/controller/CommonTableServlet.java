package controller;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import biz.TrackerBiz;
import entity.PiChart;
import entity.Table;

/**
 * Servlet implementation class CommonTableServlet
 */
public class CommonTableServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
   public CommonTableServlet() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("CommonPlatform Table Servlet start");	// console log
        
		TrackerBiz biz = new TrackerBiz();	// create biz object
		ArrayList<Table> tableList = biz.getCommonTable();
		
		request.setAttribute("tableList", tableList);
		System.out.println("setAttribute okay :D");
		
		RequestDispatcher view = request.getRequestDispatcher("tTable.jsp");
		view.include(request, response);	

		System.out.println("CommonPlatform Table Servlet fininsh");
	}
}
