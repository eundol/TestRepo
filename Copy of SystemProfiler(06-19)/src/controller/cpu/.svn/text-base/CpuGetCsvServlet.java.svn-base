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
 * Servlet implementation class CpuGetCsvServlet
 */
public class CpuGetCsvServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("CpuGetCsvServlet Start **");
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
        
//        OutputStream out = new ByteArrayOutputStream();
        
        
//        FileWriter fw = new FileWriter("Perf("+ cpuSummary.getTestCaseId() + ").csv");
        
        StringBuffer writer = new StringBuffer();
        
        
        CpuEntity entity = null;
        
        if(cpuSummary.getUserId() != null){
//        	fw.write(" ,User : " + cpuSummary.getUserId() + ",TestCase : " + cpuSummary.getTestCaseId() + ",Date : "+ created + ",\n\n");
        	writer.append(" ,User : " + cpuSummary.getUserId() + ",TestCase : " + cpuSummary.getTestCaseId() + ",Date : "+ created + ",\n\n");
        }else{
//        	fw.write(" ,TestCase : " + cpuSummary.getTestCaseId() + ",Date : "+ created + ",\n\n");
        	writer.append(" ,TestCase : " + cpuSummary.getTestCaseId() + ",Date : "+ created + ",\n\n");
        }
//        fw.write(" ,Overhead,Command,Pid,Cpu,Parent,Shared Object,Src Line,Symbol(Function)\n");
        writer.append(" ,Overhead,Command,Pid,Cpu,Parent,Shared Object,Symbol(Function),Src Line\n");
        
        for(int i = 0 ; i < cpuTable.size(); i++){
        	entity = cpuTable.get(i);
        	String line = "";
        	line = i+1 + ",";
        	line += entity.getOverhead() + ",";
        	line += entity.getCommand() + ",";
        	
        	if(entity.getPid() != null){
        		line += entity.getPid() + ",";
        	}else{
        		line += " " + ",";
        	}
        	
        	if(entity.getCpu() != null){
        		line += entity.getCpu() + ",";
        	}else{
        		line += " " + ",";
        	}
        	
        	if(entity.getParent() != null){
        		line += entity.getParent() + ",";
        	}else{
        		line += " " + ",";
        	}
        	
        	line += entity.getSharedObject() + ",";
        	
        	
        	line += entity.getSymbol() + ",";
        	
        	if(entity.getSrcLine() != null){
        		line += entity.getSrcLine() + ",";
        	}else{
        		line += " " + ",";
        	}
        	
        	System.out.println(line);
        	
//        	fw.write(line+"\n");
        	writer.append(line+"\n");
        }
//        fw.close();
        
        response.setHeader("Content-Disposition","attachment;filename="+"Perf("+ cpuSummary.getTestCaseId() + ").csv");
        
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
