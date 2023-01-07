package com.first.myservlets;

import java.util.HashMap;
import java.io.IOException;
import com.google.gson.Gson;
import java.io.BufferedReader;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import com.first.crud.BuildConnection;

@WebServlet("/bookshow")
public class AddShow extends HttpServlet{
	private static final long serialVersionUID = 1L;
	public AddShow() {
		super();
	}

	@SuppressWarnings("unchecked")
	public void doPost(HttpServletRequest req,HttpServletResponse res) throws IOException{
		BuildConnection wic=new BuildConnection();
		StringBuffer jb = new StringBuffer();
		String line = null;
		BufferedReader reader =req.getReader();
		
		while ((line = reader.readLine()) != null)
			   jb.append(line);
		
		Gson gson=new Gson();
		HashMap<String, String> json = gson.fromJson(jb.toString(), HashMap.class);
		int check=0;
		try {
			check=wic.addShow(json);
		}catch(Exception e) {
			check=0;
		}

		if(check==1) {
			String resp=gson.toJson("Success");
			res.getWriter().println(resp);
		}else if(check==0){
			String respp=gson.toJson("Fail");
			res.getWriter().println(respp);
		}
		
	}
}
