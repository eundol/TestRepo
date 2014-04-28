package bat;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import entity.BatInfo;

public class BatSummaryBarChartsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("BatSummaryBarChartsServlet **");
		request.setCharacterEncoding( "utf-8" );   
        response.setContentType("text/html; charset=utf-8"); 
		
        String countParam = request.getParameter("count");
        System.out.println("countParam : " + countParam);
        ArrayList<BatInfo> list = new ArrayList<BatInfo>();
        new biz.BatBiz().getBatResult(list);
        
        int count = 0;
        if(countParam != null && !countParam.equals("")){
        	try {
        		count = Integer.parseInt(countParam);
			} catch (Exception e) {
				System.out.println("countParam is not number ##");
				return;
			}
        }
        
        if(count > 0){
	        int listSize = list.size();
	        for (int i = 0; i < listSize - count; i++) {
				list.remove(0);
	        }
        }
        
        request.setAttribute("BatInfo", list);
        
        RequestDispatcher view = request.getRequestDispatcher("bat/bat_summary_bar.jsp");
        System.out.println("go to " + "bat/bat_summary_bar.jsp");
        view.forward(request, response);
	}

}
