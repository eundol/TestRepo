package controller.search;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import biz.CpuBiz;
import entity.CpuSearchEntity;

/**
 * Servlet implementation class SearchPopupServlet
 */
public class SearchPopupServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		System.out.println("SearchPopupServlet Start **");
	    request.setCharacterEncoding( "utf-8" );   
        response.setContentType("text/html; charset=utf-8"); 
	    //사실 별필요 없음
		
        String userId = request.getParameter("userId");
        System.out.println("userId : " + userId);
        
		ArrayList<CpuSearchEntity> CpuSearchResult = new ArrayList<CpuSearchEntity>();
		CpuBiz biz = new CpuBiz();
		biz.getCpuSearchResult(CpuSearchResult, userId);

		request.setAttribute("CpuSearchResult", CpuSearchResult);
		RequestDispatcher view = request.getRequestDispatcher("searchresult.jsp");
		System.out.println("go to searchresult.jsp");
		view.include(request, response);
	}
}