package controller.pageowner;

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
import biz.PageMemBiz;
import entity.CpuEntity;
import entity.CpuSummaryEntity;
import entity.PageOwnerEntity;

public class PageRowdataExcelServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("PageRowdataExcelServlet Start **");
	    request.setCharacterEncoding( "utf-8" );   
        response.setContentType("text/html; charset=utf-8"); 
	    //사실 별필요 없음
		
        String id = request.getParameter("id");
        String sequence = request.getParameter("sequence");
/*        String flag = "";
        if(Integer.parseInt(sequence) == 1){
        	flag = "start";
        }
        if(Integer.parseInt(sequence) == 2){
        	flag = "end";
        }*/
//        String created = "";
		CpuSummaryEntity cpuSummary = new CpuSummaryEntity();
		ArrayList<PageOwnerEntity> pageList = new ArrayList<PageOwnerEntity>();
		
        if(id!=null && !id.equals("null")){
			CpuBiz biz = new CpuBiz();
			PageMemBiz bizPage = new PageMemBiz();
//			created = biz.getCreated(id);
			biz.getCpuSummary(cpuSummary, id);
			bizPage.getPageFullData(pageList, id, sequence);			
        }
        
//        OutputStream out = new ByteArrayOutputStream();
//        FileWriter fw = new FileWriter("Perf("+ cpuSummary.getTestCaseId() + ").csv");
        
        StringBuffer writer = new StringBuffer();
        PageOwnerEntity entity = null;
        
//        if(cpuSummary.getUserId() != null){
//        	fw.write(" ,User : " + cpuSummary.getUserId() + ",TestCase : " + cpuSummary.getTestCaseId() + ",Date : "+ created + ",\n\n");
//        	writer.append(",PageOwnerData : " + id + " - " + flag + " ,User : " + cpuSummary.getUserId() + ",TestCase : " + cpuSummary.getTestCaseId() + ",Date : "+ created + ",\n\n");
//        }else{
//        	fw.write(" ,TestCase : " + cpuSummary.getTestCaseId() + ",Date : "+ created + ",\n\n");
//        	writer.append(" ,TestCase : " + cpuSummary.getTestCaseId() + ",Date : "+ created + ",\n\n");
//        }
//        fw.write(" ,Overhead,Command,Pid,Cpu,Parent,Shared Object,Src Line,Symbol(Function)\n");
        	
        writer.append(" ,Times,Order,Memory,Pid,Process,Type,Module,Purpose,Call Chain\n");
        
        for(int i = 0 ; i < pageList.size(); i++){
        	entity = pageList.get(i);
        	String line = "";
        	line = i+1 + ",";
        	line += entity.getTime() + ",";
        	line += entity.getOrder() + ",";
    		line += entity.getMemory() + ",";
    		line += entity.getPid() + ",";
        	if(entity.getProcess() != null){
        		line += "\"" + entity.getProcess().replace("\"", "\"\"") + "\",";
        	}else{
        		line += " " + ",";
        	}
        	line += entity.getType() + ",";
        	if(entity.getModule() != null){
        		line += entity.getModule() + ",";
        	}else{
        		line += " " + ",";
        	}
    		line += "\"" + entity.getKeyword() + "\",";
    		String callChain = "\"" + entity.getCallChain() + "\"";
    		callChain = callChain.replace(":::", "\n");
    		line += callChain + ",";
    		
//        	System.out.println(line);
//        	fw.write(line+"\n");
        	writer.append(line+"\n");
        }
//        fw.close();
        
        response.setHeader("Content-Disposition","attachment;filename="+"PageOwner("+ cpuSummary.getTestCaseId() + "_" + id + ").csv");
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