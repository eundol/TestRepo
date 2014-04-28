package bat;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class BatSummaryEditDeleteServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("BatSummaryEditOpenServlet **");
		request.setCharacterEncoding( "utf-8" );   
        response.setContentType("text/html; charset=utf-8"); 
        
        String build = request.getParameter("build").replace("_heesung_", "#");
        
        new biz.BatBiz().deleteBatResult(build);
        
        String resultScreen = "bat_summary_edit_open";
        RequestDispatcher view = request.getRequestDispatcher(resultScreen);
        System.out.println("go to " + resultScreen);
        view.forward(request, response);
	}

}
