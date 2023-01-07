package com.first.crud;

import java.util.Map;
import java.util.Date;
import java.util.HashMap;
import java.sql.Statement;
import java.sql.ResultSet;
import java.sql.Connection;
import java.util.ArrayList;
import java.sql.SQLException;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import com.first.pojo.HeadClass;


public class BuildConnection {
		
	public Connection getConnection() throws ClassNotFoundException,SQLException{
			
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection con=DriverManager.getConnection("jdbc:mysql://localhost:3306/movie_list?zeroDateTimeBehavior=convertToNull","root","mangat");			
			return con;
			
	}
	
	
	public int dbSize() throws ClassNotFoundException, SQLException {
		Connection con=getConnection();
		Statement st=con.createStatement();
		ResultSet rs=st.executeQuery("Select COUNT(*) from movie");
		rs.next();
		return rs.getInt(1);
	}
	
	
	public ArrayList<HeadClass> getSeachingData(int offset,int fetch,String movie_name) throws ClassNotFoundException, SQLException{
		Connection con=getConnection();	
		String movieName,theatreName,showTimings,movieType,movieDescription;
		Date releaseDate,movieValidityStart,movieValidityEnds;
		int ticketPrice;
	
		ArrayList<HeadClass> W=new ArrayList<HeadClass>();
		
		String s="%";
		s=s.concat(movie_name);
		s=s.concat("%");


		PreparedStatement st=con.prepareStatement("SELECT * FROM movie WHERE movie_name LIKE ?  ORDER BY movie_name LIMIT ? OFFSET ?");
		st.setString(1, s);
		st.setInt(2, fetch);
		st.setInt(3, offset);
		
		ResultSet rs=st.executeQuery();
		
		while(rs.next()) {
			
			HeadClass w=new HeadClass();
			movieName=rs.getString("movie_name");
			theatreName=rs.getString("theatre_name");
			showTimings=rs.getString("show_timings");
			movieType=rs.getString("movie_type");
			movieDescription=rs.getString("movie_description");
			releaseDate=rs.getDate("release_date");
			movieValidityStart=rs.getDate("movie_validity_start");
			movieValidityEnds=rs.getDate("movie_validity_ends");
			ticketPrice=rs.getInt("ticket_price");
			
			w.setMovieName(movieName);
			w.setTheatreName(theatreName);
			w.setShowTimings(showTimings);
			w.setMovieType(movieType);
			w.setMovieDescription(movieDescription);
			w.setReleaseDate(releaseDate);
			w.setMovieValidityStart(movieValidityStart);
			w.setMovieValidityEnds(movieValidityEnds);
			w.setTicketPrice(ticketPrice);
			
			W.add(w);
		}
		
		return W;

	}
	
	
	public ArrayList<HeadClass> getData(int offset,int fetch) throws ClassNotFoundException, SQLException{
		Connection con=getConnection();
	
		String theatreName,movieName,showTimings,movieType,movieDescription;
		Date releaseDate,movieValidityStart,movieValidityEnds;
		int ticketPrice;
		
		ArrayList<HeadClass> W=new ArrayList<HeadClass>();
		
		PreparedStatement st=con.prepareStatement("Select * FROM movie ORDER BY movie_name LIMIT ? OFFSET ?");
		st.setInt(1, fetch);
		st.setInt(2, offset);
		
		ResultSet rs=st.executeQuery();
		
		while(rs.next() ) {
			HeadClass w=new HeadClass();
			
			movieName=rs.getString("movie_name");
			releaseDate=rs.getDate("release_date");
			movieType=rs.getString("movie_type");
			movieDescription=rs.getString("movie_description");
			theatreName=rs.getString("theatre_name");
			showTimings=rs.getString("show_timings");
			ticketPrice=rs.getInt("ticket_price");
			movieValidityStart=rs.getDate("movie_validity_start");
			movieValidityEnds=rs.getDate("movie_validity_ends");
			
			w.setMovieName(movieName);
			w.setReleaseDate(releaseDate);
			w.setMovieType(movieType);
			w.setMovieDescription(movieDescription);
			w.setTheatreName(theatreName);
			w.setShowTimings(showTimings);
			w.setTicketPrice(ticketPrice);
			w.setMovieValidityStart(movieValidityStart);
			w.setMovieValidityEnds(movieValidityEnds);
			System.out.println(movieName);
			W.add(w);
		}
		return W;
	}
	
	
	public boolean Check(Connection con,String theatre_name) throws SQLException {
		PreparedStatement smt1=con.prepareStatement("SELECT EXISTS (SELECT * FROM theatre WHERE theatre_name=?)");
		smt1.setString(1,theatre_name);

		ResultSet a=smt1.executeQuery();
		
		a.next();
		
		if(a.getInt(1) == 1) {
			return true;
		}
		
		return false;
	}
	
	
	public int addData(HashMap<String, String> json) throws ClassNotFoundException, SQLException {
		
		Connection con=getConnection();
		String movie_name=json.get("movie_name");
		String movie_type=json.get("movie_type");
		String theatre_name=json.get("theatre_name");
		String show_timings=json.get("show_timings");
		String movie_description=json.get("movie_description");
		String release_date=json.get("release_date");
		String movie_validity_start=json.get("movie_validity_start");
		String movie_validity_ends=json.get("movie_validity_ends");
		
	    int ticket_price=Integer.parseInt(json.get("ticket_price"));
	
		if(Check(con,theatre_name)==false)return 0;
		
		try {
			PreparedStatement pt=con.prepareStatement("INSERT INTO movie values(?,?,?,?,?,?,?,?,?)");
			
			pt.setString(1,movie_name);
			pt.setString(2, release_date);
			pt.setString(3, movie_type);
			pt.setString(4, movie_description);
			pt.setString(5,theatre_name);
			pt.setString(6, show_timings);
			pt.setInt(7, ticket_price);
			pt.setString(8, movie_validity_start);
			pt.setString(9,movie_validity_ends);
			pt.executeUpdate();
		}
		catch(SQLException S) {
			return 0;
		}
		
		return 1;
		
	}
	
	public int addUser(HashMap<String, String> json) throws ClassNotFoundException, SQLException {
			
			Connection con=getConnection();
			String user_name=json.get("user_name");
			String mobile_number=json.get("mobile_number");
			String user_id=json.get("user_id");
			String user_password=json.get("user_password");
			String user_type="normal";
	
			try {
				PreparedStatement pt=con.prepareStatement("Select Exists(Select * From usertable where user_id=?)");
				pt.setString(1, user_id);
				ResultSet a=pt.executeQuery();
				a.next();
				if(a.getInt(1) == 0) {
					pt=con.prepareStatement("INSERT INTO usertable values(?,?,?,?,?)");
					pt.setString(1,user_name);
					pt.setString(2, mobile_number);
					pt.setString(3, user_password);
					pt.setString(4, user_id);
					pt.setString(5,user_type);
					pt.executeUpdate();
				}else {
					return 0;
				}
			}
			catch(SQLException S) {
				return 0;
			}		
			return 1;
		}
	public int loginUser(HashMap<String, String> json) throws ClassNotFoundException, SQLException {
		
		Connection con=getConnection();
		String user_id=json.get("user_id");
		String user_password=json.get("user_password");
		
		String user_type=json.get("user_type");

		try {
			if(user_type.equals("admin")) {
				PreparedStatement pt=con.prepareStatement("Select Exists(Select * From usertable where user_id=? AND user_password=? AND mobile_number=? )");
				long mobile_number=Long.parseLong(json.get("user_mobile"));
				pt.setString(1, user_id);
				pt.setString(2, user_password);
				pt.setLong(3, mobile_number);
				ResultSet a=pt.executeQuery();
				a.next();
				if(a.getInt(1) == 1) {
					return 1;
				}else {
					return 0;
				}
			}else {
				PreparedStatement pt=con.prepareStatement("Select Exists(Select * From usertable where user_id=? AND user_password=?)");
				pt.setString(1, user_id);
				pt.setString(2, user_password);
				ResultSet a=pt.executeQuery();
				a.next();
				if(a.getInt(1) == 1) {
					return 1;
				}else {
					return 0;
				}
			}
		}
		catch(SQLException S) {
			System.out.println(S.getMessage());
			return 0;
		}		
	}
public int bookTicket(HashMap<String, String> json) throws ClassNotFoundException, SQLException {
		
		Connection con=getConnection();
		String user_id=json.get("user_id");
		String movie_name=json.get("movie_name");
		String theatre_name=json.get("theatre_name");
		String show_timings=json.get("show_timings");
		String show_date=json.get("show_date");
		String seat_booked=json.get("seat_booked");
		try {
			PreparedStatement pt=con.prepareStatement("Select ticket_price from movie WHERE movie_name=?");
			pt.setString(1, movie_name);
			ResultSet t=pt.executeQuery();
			t.next();
			int price=t.getInt(1);
			int check=addShow(json);
			if(check==0)return 0;
			pt=con.prepareStatement("Select capacity from theatrebook WHERE theatre_name=? AND movie_name=? AND show_timings=? AND show_date=?");	
			pt.setString(1,theatre_name);
			pt.setString(2, movie_name);
			pt.setString(3, show_timings);
			pt.setString(4, show_date);
			ResultSet a=pt.executeQuery();
			a.next();
			if(a.getInt(1)!=0 && a.getInt(1)>=Integer.parseInt(seat_booked)) {
				int capa=a.getInt(1)-Integer.parseInt(seat_booked);
				
				pt=con.prepareStatement("INSERT INTO userbookedshow VALUES(?,?,?,?,?,?,?)");
				pt.setString(1,user_id);
				pt.setString(2, movie_name);
				pt.setString(3,show_timings);
				pt.setString(4, show_date);
				pt.setString(5, theatre_name);
				pt.setInt(6, price*Integer.parseInt(seat_booked));
				pt.setInt(7,Integer.parseInt(seat_booked));
				pt.execute();
				
				pt=con.prepareStatement("UPDATE theatrebook SET capacity=? WHERE theatre_name=? AND movie_name=? AND show_timings=? AND show_date=?");	
				capa=a.getInt(1)-Integer.parseInt(seat_booked);
				pt.setInt(1, capa);
				pt.setString(2,theatre_name);
				pt.setString(3, movie_name);
				pt.setString(4, show_timings);
				pt.setString(5, show_date);
				pt.executeUpdate();
				return 1;
			}else {
				return 0;
			}
		}
		catch(SQLException S) {
			System.out.println(S.getMessage());
			return 0;
		}		
	}
	public int addTheatre(HashMap<String, String> json) throws ClassNotFoundException, SQLException {	
			Connection con=getConnection();
			String theatre_name=json.get("theatre_name");
			String theatre_location=json.get("theatre_location");
			try {
				PreparedStatement pt=con.prepareStatement("INSERT INTO theatre values(?,?)");	
				pt.setString(1,theatre_name);
				pt.setString(2, theatre_location);
				pt.executeUpdate();
			}
			catch(SQLException S) {
				return 0;
			}
			return 1;
		}

	public int addShow(HashMap<String, String> json) throws ClassNotFoundException, SQLException {	
		Connection con=getConnection();
		String movie_name=json.get("movie_name");
		String theatre_name=json.get("theatre_name");
		String show_timings=json.get("show_timings");
		String show_date=json.get("show_date");
		
		try {
			PreparedStatement pt=con.prepareStatement("SELECT EXISTS(SELECT * FROM theatrebook where theatre_name=?  AND movie_name=?  AND show_timings=? AND show_date=?)");	
			pt.setString(1, theatre_name);
			pt.setString(2,movie_name);
			pt.setString(3, show_timings);
			pt.setString(4,show_date);			
			ResultSet a=pt.executeQuery();
			a.next();
			if(a.getInt(1) == 0) {
				PreparedStatement pt1=con.prepareStatement("INSERT INTO theatrebook values(?,?,?,?,?)");
				pt1.setString(1, theatre_name);
				pt1.setString(2, movie_name);
				pt1.setString(3, show_timings);
				pt1.setString(4, show_date);
				pt1.setInt(5, 60);
				pt1.executeUpdate();
			}				
		}
		catch(SQLException S) {
			System.out.println(S.getMessage());
			return 0;
		}
		return 1;
	}
	

	public int editData(String release_date, String movie_type, String movie_description, String theatre_name, String show_timings,String movie_validity_start,String movie_validity_ends,int ticket_price,ArrayList<String> selectedValues) throws ClassNotFoundException, SQLException {
		
		Connection con=getConnection();
	
		if(Check(con,theatre_name)==false)return 0;
		
		try {
			PreparedStatement pt=con.prepareStatement("UPDATE movie SET release_date=?, movie_type=?, movie_description=?,theatre_name=?,show_timings=?,ticket_price=?,movie_validity_start=?,movie_validity_ends=?WHERE movie_name=?");
			
			pt.setString(1, release_date);
			pt.setString(2, movie_type);
			pt.setString(3, movie_description);
			pt.setString(4,theatre_name);
			pt.setString(5, show_timings);
			pt.setInt(6, ticket_price);
			pt.setString(7, movie_validity_start);
			pt.setString(8,movie_validity_ends);
			for(String val:selectedValues) {
				pt.setString(9, val);
				pt.executeUpdate();
			}
			
			pt.close();
			pt.close();
		}
		catch(SQLException S) {
			System.out.println(S.getMessage()+"\n"+S.getErrorCode());
			return 0;
		}
		
		return 1;
		
	}
	
	
	public void deleteData(ArrayList<String> selectedValues) throws ClassNotFoundException, SQLException {
	
		Connection con=getConnection();	
		PreparedStatement pt=con.prepareStatement("delete from movie where movie_name=?");
		
		for(String val:selectedValues) {
			pt.setString(1, val);
			pt.executeUpdate();
		}
		
		pt.close();
		
	}
	
	
		public int searchAvialable(String cust_number) throws ClassNotFoundException, SQLException {
		Connection con=getConnection();
		
		String s="%";
		s=s.concat(cust_number);
		s=s.concat("%");


		PreparedStatement pst=con.prepareStatement("SELECT COUNT(*) FROM movie WHERE movie_name LIKE ?");
		pst.setString(1,s);

		ResultSet rs=pst.executeQuery();
		rs.next();
		
		return rs.getInt(1);
		
	}
	
	
	public int advSearchTotal(HashMap<String, String> json) throws ClassNotFoundException, SQLException {
	
		Connection con=getConnection();
		String s1="SELECT * FROM movie WHERE ";
		
		int size=json.size();
		int j=1;
		
		for (Map.Entry<String, String> S :json.entrySet()) {
			if(S.getKey().toString().equals("search_date")) {
				s1=s1.concat(" movie_validity_start<= '");
				s1=s1.concat(S.getValue().toString());
				s1=s1.concat("' AND movie_validity_ends>='");
				s1=s1.concat(S.getValue().toString());
				s1=s1.concat("' ");
			}else {
				s1=s1.concat(S.getKey().toString());
				s1=s1.concat(" LIKE '%");
				s1=s1.concat(S.getValue().toString());
				s1=s1.concat("%'");
			}

			
			if(j!=size) {
				s1=s1.concat(" AND ");
				j++;
			}
		}
		
		String check="SELECT EXISTS (";
		check=check.concat(s1);
		check=check.concat(")");
		
		PreparedStatement pst=con.prepareStatement(check);
		
		ResultSet rs1=pst.executeQuery();
		
		rs1.next();
		if(rs1.getInt(1) == 0) {
			return 0;
		}
		
		s1=s1.replace(" * ", " COUNT(*) ");
		PreparedStatement ps=con.prepareStatement(s1);
					
		ResultSet rs=ps.executeQuery();
		rs.next();
		
		return rs.getInt(1);
		
	}
	
	
	public ArrayList<HeadClass> advsearch(HashMap<String, String> jsonData,int prevRes,int rowsPerPage) throws ClassNotFoundException, SQLException{
	
		
		Connection con=getConnection();
		
		String s1="SELECT * FROM movie WHERE ";
		
		int size=jsonData.size();
		int j=1;
		
		for (Map.Entry<String, String> S :jsonData.entrySet()) {
			if(S.getKey().toString().equals("search_date")) {
				s1=s1.concat(" movie_validity_start<= '");
				s1=s1.concat(S.getValue().toString());
				s1=s1.concat("' AND movie_validity_ends>='");
				s1=s1.concat(S.getValue().toString());
				s1=s1.concat("' ");
			}else {
				s1=s1.concat(S.getKey().toString());
				s1=s1.concat(" LIKE '%");
				s1=s1.concat(S.getValue().toString());
				s1=s1.concat("%'");
			}

			
			if(j!=size) {
				s1=s1.concat(" AND ");
				j++;
			}
		}
		s1=s1.concat(" ORDER BY movie_name LIMIT ? OFFSET ?");
		
					
		PreparedStatement pst=con.prepareStatement(s1);
		pst.setInt(1, rowsPerPage);
		pst.setInt(2, prevRes);
		
		ResultSet rs=pst.executeQuery();
		String movieName,theatreName,showTimings,movieType,movieDescription;
		Date releaseDate,movieValidityStart,movieValidityEnds;
		int ticketPrice;
	
		ArrayList<HeadClass> W=new ArrayList<HeadClass>();
		
		while(rs.next()) {
			
			HeadClass w=new HeadClass();
			movieName=rs.getString("movie_name");
			theatreName=rs.getString("theatre_name");
			showTimings=rs.getString("show_timings");
			movieType=rs.getString("movie_type");
			movieDescription=rs.getString("movie_description");
			releaseDate=rs.getDate("release_date");
			movieValidityStart=rs.getDate("movie_validity_start");
			movieValidityEnds=rs.getDate("movie_validity_ends");
			ticketPrice=rs.getInt("ticket_price");
			
			w.setMovieName(movieName);
			w.setTheatreName(theatreName);
			w.setShowTimings(showTimings);
			w.setMovieType(movieType);
			w.setMovieDescription(movieDescription);
			w.setReleaseDate(releaseDate);
			w.setMovieValidityStart(movieValidityStart);
			w.setMovieValidityEnds(movieValidityEnds);
			w.setTicketPrice(ticketPrice);
			
			W.add(w);
		}
		
		return W;

	}
	
}