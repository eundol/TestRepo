import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class download extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException {
		System.out.println("download Servlet~");

		String filePath = request.getParameter("filePath");
		String fileName = request.getParameter("fileName");
		System.out.println(filePath);
		System.out.println(fileName);

		// 다운로드 알림창이 뜨도록 하기 위해서 컨텐트 타입을 8비트 바이너리로 설정한다.
	    response.setContentType("application/octet-stream");
	     
	    // 저장될 파일 이름을 설정한다.
	    response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\";");
	
	    // 파일패스 및 파일명을 지정한다.
	    File file = new File(filePath);
	    
	    byte bytestream[] = new byte[2048000];
	    
	    // response out에 파일 내용을 출력한다.
	    if (file.isFile() && file.length() > 0){
	         
	        FileInputStream fis = new FileInputStream(file);
	        BufferedInputStream bis = new BufferedInputStream(fis);
	        BufferedOutputStream bos = new BufferedOutputStream(response.getOutputStream());
	             
	        int read = 0;
	             
	        while ((read = bis.read(bytestream)) != -1){
	            bos.write(bytestream , 0, read);
	        }
	         
	        bos.close();
	        bis.close();
	    }
	}
}
