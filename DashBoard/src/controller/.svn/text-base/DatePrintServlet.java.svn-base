package controller;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import entity.DatePrint;

import biz.GerritBiz;

/**
 * Servlet implementation class DatePrintServlet
 */
public class DatePrintServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
   
	public DatePrintServlet() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("DatePrint Servlet start :D");
		
		GerritBiz biz = new GerritBiz();	
		ArrayList<DatePrint> datePrintList = biz.getDatePrint();
		
		request.setAttribute("datePrintList", datePrintList);
		System.out.println("request.setAttribute okay :D");
		
		RequestDispatcher view = request.getRequestDispatcher("gDatePrint.jsp");
		view.include(request, response);

		System.out.println("DatePrint Servlet finish :D");
	}

}
