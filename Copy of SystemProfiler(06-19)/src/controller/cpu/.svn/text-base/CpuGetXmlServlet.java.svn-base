package controller.cpu;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import biz.CpuBiz;
import entity.CpuEntity;
import entity.CpuSummaryEntity;

/**
 * Servlet implementation class CpuGetXmlServlet
 */
public class CpuGetXmlServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("CpuGetXmlServlet Start **");
	    request.setCharacterEncoding( "utf-8" );   
        response.setContentType("text/html; charset=utf-8"); 
	    //사실 별필요 없음
		
        String id = request.getParameter("id");
        System.out.println("id : " + id);
        
		ArrayList<CpuEntity> cpuTable = new ArrayList<CpuEntity>();
		CpuSummaryEntity cpuSummary = new CpuSummaryEntity();
		String created = "";
		
        if(id!=null && !id.equals("null")){
			CpuBiz biz = new CpuBiz();
			created = biz.getCpuTable(cpuTable, id);
			biz.getCpuSummary(cpuSummary, id);
        }
        
        StringBuffer writer = new StringBuffer();
        
        CpuEntity entity = null;
        
        writer.append("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n");
//        writer.append(" ,Overhead,Command,Pid,Cpu,Parent,Shared Object,Src Line,Symbol(Function)\n");
        
        writer.append("<perf>\n");
        writer.append("\t<information>\n");
        
        if(cpuSummary.getUserId() != null){
        	writer.append("\t\t<user>" + cpuSummary.getUserId() + "</user>\n\t\t<test_case>" + cpuSummary.getTestCaseId() + "</test_case>\n\t\t<date>"+ created + "</date>\n");
        }else{
        	writer.append("\t\t<test_case>" + cpuSummary.getTestCaseId() + "</test_case>\n\t\t<date>"+ created + "</date>\n");
        }
        writer.append("\t</information>\n");
        
        writer.append("\t<rows>\n");
        int no = 0;
        for(int i = 0 ; i < cpuTable.size(); i++){
        	no++;
        	writer.append("\t\t<row>\n");
        	entity = cpuTable.get(i);
        	String line = "";
        	line += "\t\t\t<field name=\"no\">"+no+"</field>\n";
        	line += "\t\t\t<field name=\"overhead\">"+entity.getOverhead()+"</field>\n";
        	line += "\t\t\t<field name=\"command\">"+entity.getCommand()+"</field>\n";
        	
        	if(entity.getPid() != null){
        		line += "\t\t\t<field name=\"pid\">"+entity.getPid()+"</field>\n";
        	}else{
        		line += "\t\t\t<field name=\"pid\"></field>\n";
        	}
        	
        	if(entity.getCpu() != null){
        		line += "\t\t\t<field name=\"cpu\">"+entity.getCpu()+"</field>\n";
        	}else{
        		line += "\t\t\t<field name=\"cpu\"></field>\n";
        	}
        	
        	if(entity.getParent() != null){
        		line += "\t\t\t<field name=\"parent\">"+entity.getParent()+"</field>\n";
        	}else{
        		line += "\t\t\t<field name=\"parent\"></field>\n";
        	}
        	
        	line += "\t\t\t<field name=\"shared_object\">"+entity.getSharedObject()+"</field>\n";
        	
        	line += "\t\t\t<field name=\"symbol\">"+entity.getSymbol()+"</field>\n";
        	
        	if(entity.getSrcLine() != null){
        		line += "\t\t\t<field name=\"src_line\">"+entity.getSrcLine()+"</field>\n";
        	}else{
        		line += "\t\t\t<field name=\"src_line\"></field>\n";
        	}
        	
        	System.out.println(line);
        	
        	writer.append(line+"\t\t</row>\n");
        }
        writer.append("\t</rows>\n");
        writer.append("</perf>");
        
        response.setHeader("Content-Disposition","attachment;filename="+"Perf("+ cpuSummary.getTestCaseId() + ").xml");
        
        ServletOutputStream out = response.getOutputStream();
        InputStream in = new ByteArrayInputStream(writer.toString().getBytes("UTF-8"));
        int index;
        while((index=(in.read())) != -1){
        	out.write(index);
        }
        in.close();
        out.flush();
        out.close();
        return;
	}
}