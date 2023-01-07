package com.first.pojo;
import java.util.Date;

public class HeadClass {
	String theatreName,theatreLocation,movieName,showTimings,movieType,movieDescription;
	String userName,userPassword,userId,userType;
	int capacity,ticketPrice,totalSeats;
	
	long mobileNumber;
	Date showDate,releaseDate,movieValidityStart,movieValidityEnds;

	public String getTheatreName() {
		return theatreName;
	}

	public void setTheatreName(String theatreName) {
		this.theatreName = theatreName;
	}

	public String getTheatreLocation() {
		return theatreLocation;
	}

	public void setTheatreLocation(String theatreLocation) {
		this.theatreLocation = theatreLocation;
	}

	public String getMovieName() {
		return movieName;
	}

	public void setMovieName(String movieName) {
		this.movieName = movieName;
	}

	public String getShowTimings() {
		return showTimings;
	}

	public void setShowTimings(String showTimings) {
		this.showTimings = showTimings;
	}

	public String getMovieType() {
		return movieType;
	}

	public void setMovieType(String movieType) {
		this.movieType = movieType;
	}

	public String getMovieDescription() {
		return movieDescription;
	}

	public void setMovieDescription(String movieDescription) {
		this.movieDescription = movieDescription;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserPassword() {
		return userPassword;
	}

	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
	}

	public int getCapacity() {
		return capacity;
	}

	public void setCapacity(int capacity) {
		this.capacity = capacity;
	}

	public int getTicketPrice() {
		return ticketPrice;
	}

	public void setTicketPrice(int ticketPrice) {
		this.ticketPrice = ticketPrice;
	}

	public int getTotalSeats() {
		return totalSeats;
	}

	public void setTotalSeats(int totalSeats) {
		this.totalSeats = totalSeats;
	}

	public long getMobileNumber() {
		return mobileNumber;
	}

	public void setMobileNumber(long mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	public Date getShowDate() {
		return showDate;
	}

	public void setShowDate(Date showDate) {
		this.showDate = showDate;
	}

	public Date getReleaseDate() {
		return releaseDate;
	}

	public void setReleaseDate(Date releaseDate) {
		this.releaseDate = releaseDate;
	}

	public Date getMovieValidityStart() {
		return movieValidityStart;
	}

	public void setMovieValidityStart(Date movieValidityStart) {
		this.movieValidityStart = movieValidityStart;
	}

	public Date getMovieValidityEnds() {
		return movieValidityEnds;
	}

	public void setMovieValidityEnds(Date movieValidityEnds) {
		this.movieValidityEnds = movieValidityEnds;
	}

	@Override
	public String toString() {
		return "HeadClass [theatreName=" + theatreName + ", theatreLocation=" + theatreLocation + ", movieName="
				+ movieName + ", showTimings=" + showTimings + ", movieType=" + movieType + ", movieDescription="
				+ movieDescription + ", userName=" + userName + ", userPassword=" + userPassword + ", userId=" + userId
				+ ", userType=" + userType + ", capacity=" + capacity + ", ticketPrice=" + ticketPrice + ", totalSeats="
				+ totalSeats + ", mobileNumber=" + mobileNumber + ", showDate=" + showDate + ", releaseDate="
				+ releaseDate + ", movieValidityStart=" + movieValidityStart + ", movieValidityEnds="
				+ movieValidityEnds + "]";
	}
	
}
