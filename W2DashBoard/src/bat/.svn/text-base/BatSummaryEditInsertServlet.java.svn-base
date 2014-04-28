package bat;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import entity.BatInfo;

public class BatSummaryEditInsertServlet extends HttpServlet { 
	private static final long serialVersionUID = 1L;
       
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("BatSummaryEditOpenServlet **");
		request.setCharacterEncoding( "utf-8" );   
        response.setContentType("text/html; charset=utf-8"); 
        
        BatInfo insertData = new BatInfo(request.getParameter("build"), request.getParameter("date"), request.getParameter("result"), Integer.parseInt(request.getParameter("pass")), Integer.parseInt(request.getParameter("total")), Integer.parseInt(request.getParameter("pass_rate")));
        boolean result = new biz.BatBiz().addBatResult(insertData);
        System.out.println(result);
        String resultScreen = "common/error.html";
        if(result){
        	resultScreen = "common/success.html";
        }
        RequestDispatcher view = request.getRequestDispatcher(resultScreen);
        System.out.println("go to " + resultScreen);
        view.forward(request, response);
	}

}
