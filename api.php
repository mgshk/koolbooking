<?php
	
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Methods: PUT, GET, POST");
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

	require_once("Rest.inc.php");	
	
	class API extends REST {
	
		public $data = "";
		
		const DB_SERVER = "localhost";
		const DB_USER = "silverstar_kb16";
		const DB_PASSWORD = "Sandra@1212";
		const DB = "silverstar_kb16";
		
		private $db = NULL;
		
		private $site_url = 'http://koolbooking.com/';
		
		public function __construct(){
			parent::__construct();				// Init parent contructor
			$this->dbConnect();					// Initiate Database connection
		}
		
		/*
		 *  Database connection 
		*/
		private function dbConnect(){
			$this->db = mysql_connect(self::DB_SERVER,self::DB_USER,self::DB_PASSWORD);
			if($this->db)
				mysql_select_db(self::DB,$this->db);				
				
		}
		
		/*
		 * Public method for access api.
		 * This method dynmically call the method based on the query string
		 *
		 */
		public function processApi(){			
			//$func = strtolower(trim(str_replace("/","",$_REQUEST['rquest'])));
			$request_ar=explode("/",$_REQUEST['rquest']);
			$func = strtolower($request_ar[0]);			
			/*$param_val='';
			if ($request_ar[1]) {
				$param_val=$request_ar[1];
			}*/
			if((int)method_exists($this,$func) > 0)
				$this->$func();
			else
				$this->response('',404);				
			// If the method not exist with in this class, response would be "Page not found".
		}
		//processApi ends
		
		//get meta field name in table 
		public function get_field_value($table_name,$post_field,$post_id,$meta_key) {
		//echo "SELECT meta_value FROM $table_name WHERE $post_field=$post_id and meta_key='$meta_key'"; die();
			$postmeta_query = mysql_query("SELECT meta_value FROM $table_name WHERE $post_field=$post_id and meta_key='$meta_key'");
			if (mysql_num_rows($postmeta_query)>0) {
				while($get_field_value=mysql_fetch_array($postmeta_query)){	
					return $get_field_value['meta_value'];				
				}
			}		
		}
		//get meta field name in table ends here
		
		
		private function login(){
			include('../wp-includes/class-phpass.php');
			//declare PasswordHash function to compare received password with hashed password which is existing in table
			$wp_hasher = new PasswordHash(8, TRUE);
			// Cross validation if the request method is POST else it will return "Not Acceptable" status
			//if($this->get_request_method() != "POST"){
			//	$this->response('',406);
			//}
			
			$user_email = $this->_request['user_login'];		
			$user_pass = $this->_request['user_pass'];
			//$user_email = 'iitkiy@gmail.com';		
			//$user_pass = 'Sandra@1212';
			
			// Input validations
			if(!empty($user_email) and !empty($user_pass)){
				//if(filter_var($user_login, FILTER_VALIDATE_EMAIL)){
					$sql = mysql_query("SELECT * from wp_kbusers where user_status=0 and user_email='$user_email'", $this->db);
					
					if(mysql_num_rows($sql) > 0){
						$user_found = 0;
						while($row = mysql_fetch_array($sql,MYSQL_ASSOC)) {
							$user_login_db = $row['user_login'];
							$password_hashed = $row['user_pass'];
							//check matching password in table
							if($wp_hasher->CheckPassword($user_pass, $password_hashed)) {
								$result = array('success' => 1, 'data' => $row);
								$user_found = 1;
							}
						}
						
						if ($user_found == 0) {
							$error = array('status' => 0, "error" => "Please check your login credentials");
							$this->response($this->json($error), 200);
							
						} else {	
							// If success everythig is good send header as "OK" and user details
							$this->response($this->json($result), 200);
						}
						
					} else {
						$error = array('status' => 0, "error" => "Please check your login credentials");
						$this->response($this->json($error), 200);
					}
				//} //if filter_var condition ends
			} //if input validation ends 
			else {
				//$this->response('', 400);
				$error = array('status' => 0, "error" => "Please enter Username/Password");
				$this->response($this->json($error), 200);
			}
			
		}
		//login ends 
		
		public function social_login() {
			
			include('../wp-includes/class-phpass.php');
			//declare PasswordHash function to compare received password with hashed password which is existing in table
			$wp_hasher = new PasswordHash(8, TRUE);
			
			$split_username = explode("@", $this->_request['user_email']);
			
			$user_login = $split_username[0];
			$user_pass = $wp_hasher->HashPassword('testpass'); //for social login we create a dummy password 
			$user_nicename = $split_username[0];
			$user_email = $this->_request['user_email'];
			$first_name = $this->_request['first_name'];
			$last_name = $this->_request['last_name'];
			$st_phone = $this->_request['st_phone'];
			$user_url = $this->_request['user_url'];
			$user_registered = date('Y-m-d H:i:s');
			//$user_activation_key = $this->_request['user_activation_key'];
			$user_activation_key = '';
			$user_status = 0;
			$display_name = $this->_request['first_name'];
	
			if(!empty($user_email) && !empty($first_name))
			{	
				$res_chk=mysql_query("select * from wp_kbusers where user_email='$user_email' and user_url='' and user_status=0");
				if (mysql_num_rows($res_chk)>0) {
						$error = array('status' => 0, "error" => "Email address already exist");
						$this->response($this->json($error), 200);
				
				} else {					
					
					$token=rand(1000,9999);					
					$user_result = mysql_query("INSERT INTO wp_kbusers(user_login,user_pass,user_nicename,user_email,user_url,user_registered,user_activation_key,user_status,display_name) VALUES('$user_login','$user_pass','$user_nicename','$user_email','$user_url','$user_registered','$token',$user_status,'$display_name')") ;
					$id=mysql_insert_id();					
					
					//insert user meta table
					$user_result_update1 = mysql_query("INSERT INTO wp_kbusermeta(user_id,meta_key,meta_value) VALUES ($id,'first_name','$first_name'),($id,'last_name','$last_name'),($id,'st_phone','$st_phone')") ;
					
					if ($id) {
						$result_ret = array('status' => 1,'userID'=>$id);		
						$this->response($this->json($result_ret), 200);
					}else {
						$error = array('status' => 0, "error" => "Record Not Added");
						$this->response($this->json($error), 200);
					}
					
				}
				
			} else {
				$error = array('status' => 0, "error" => "Name and email are required");
				$this->response($this->json($error), 200);
			}
			
		
		} 
		//social login ends
		
		
		public function forgot_password() {
			
			include('../wp-includes/class-phpass.php');
			//declare PasswordHash function to compare received password with hashed password which is existing in table
			$wp_hasher = new PasswordHash(8, TRUE);			
			
			$user_email = $this->_request['user_email'];
			$new_password = $this->_request['new_password'];
			$confirm_password = $this->_request['confirm_password'];
			//$user_email = 'pragisrathish@gmail.com';
			//$user_activation_key = $this->_request['user_activation_key'];
			
			if(!empty($user_email))
			{	
				//password match validation
				if($new_password == $confirm_password){
			
					$res_chk=mysql_query("select * from wp_kbusers where user_email='$user_email' and user_url='' and user_status=0");
					if (mysql_num_rows($res_chk)>0) {
						//get user_id to update
						$row = mysql_fetch_array($res_chk);
						$user_id = $row['ID'];
						
						$token=rand(1000,9999);
						$user_pass = $wp_hasher->HashPassword($new_password);
						mysql_query("update wp_kbusers set user_pass='$user_pass' where ID=$user_id");						
						
											                    	
						$result_ret = array('status' => 1,'userID'=>$user_id);							
						$this->response($this->json($result_ret), 200);				
				
					} else {
						$error = array('status' => 0, "error" => "Email address does not exist");
						$this->response($this->json($error), 200);
					}
				} else {
					$error = array('status' => 0, "error" => "Password does not match");
					$this->response($this->json($error), 200);
				}	
				
			} else {
				$error = array('status' => 0, "error" => "Email is required"); 
				$this->response($this->json($error), 200);
			}
		}	
		//forgot password ends
		
		public function geteventlist() {
			
			$result=array();	
			$result1=array();		
			$res_events=mysql_query("SELECT * FROM `wp_kbposts` as a INNER JOIN `wp_kbst_activity` as b on a.id=b.post_id WHERE a.post_type='st_activity' and a.post_status='publish' ORDER BY RAND() LIMIT 10");	
			if (mysql_num_rows($res_events)>0) {
				while ($rs_event=mysql_fetch_array($res_events)) {		
					$result1['id']=$rs_event['ID'];	
					$result1['post_title']=$rs_event['post_title'];
					$result1['address']= $this->get_field_value('wp_kbpostmeta','post_id',$rs_event['ID'],'address');	
					$result1['is_featured']= $this->get_field_value('wp_kbpostmeta','post_id',$rs_event['ID'],'is_featured');	
					//$result1['rate_review']= $this->get_field_value('wp_kbpostmeta','post_id',$rs_event['ID'],'rate_review');	
					$result1['event_date']=$rs_event['check_in'];
					//get image url
						$event_img_query=mysql_query("SELECT p.guid FROM wp_kbpostmeta AS pm INNER JOIN wp_kbposts AS p ON pm.meta_value=p.ID
WHERE pm.post_id = '".$rs_event['ID']."'
AND pm.meta_key = '_thumbnail_id'");
						while ($event_img=mysql_fetch_array($event_img_query)) {
							$result1['image_url'] = $event_img['guid'];
						}
					
					
					//get availability date and price
					$event_ID = $rs_event['ID'];
					$current_timestamp = strtotime(date('Y-m-d'));
					$res_events_avai=mysql_query("SELECT * FROM `wp_kbst_availability` WHERE post_type='st_activity' and post_id=$event_ID and check_in='$current_timestamp'");	
					if (mysql_num_rows($res_events_avai)>0) {
						while ($res_events_avai_row=mysql_fetch_array($res_events_avai)) {		
							//$result1['id']=$res_events_avai_row['id'];	
							//$result1['post_id']=$res_events_avai_row['post_id'];	
							//$result1['check_in']=$res_events_avai_row['check_in'];	
							//$result1['check_out']=$res_events_avai_row['check_out'];
							$result1['adult_price']=$res_events_avai_row['adult_price'];	
							$result1['child_price']=$res_events_avai_row['child_price'];	
							$result1['infant_price']=$res_events_avai_row['infant_price'];
							$result1['calendar_type_price']=$res_events_avai_row['calendar_type_price'];
							}
							
						}
						
					array_push($result,$result1);
				}
			}				
								
			if (count($result)>0) {				
				$result_ret = array('status' => 1,'data'=>$result);					
				$this->response($this->json($result_ret), 200);
			} else {						
				$error = array('status' => 0,'error'=>'No records found');	
				$this->response($this->json($error), 200); // If no records "No Content" status					
			}
			
		}
		//geteventlist ends
		
		public function getfeaturedeventlist() {
								
			$result=array();	
			$result1=array();		
			$res_events=mysql_query("SELECT * FROM `wp_kbposts` as a INNER JOIN `wp_kbst_activity` as b on a.id=b.post_id WHERE a.post_type='st_activity' and a.post_status='publish' ORDER BY RAND() LIMIT 10");	
			if (mysql_num_rows($res_events)>0) {
				while ($rs_event=mysql_fetch_array($res_events)) {
					//check featured option is on from post meta table
					$result1['is_featured']= $this->get_field_value('wp_kbpostmeta','post_id',$rs_event['ID'],'is_featured');	
					if($result1['is_featured'] == 'on'){
						$result1['id']=$rs_event['ID'];	
						$result1['post_title']=$rs_event['post_title'];
						$result1['address']= $this->get_field_value('wp_kbpostmeta','post_id',$rs_event['ID'],'address');						
						//$result1['rate_review']= $this->get_field_value($rs_event['ID'],'rate_review','wp_kbpostmeta');	
						$result1['event_date']=$rs_event['check_in'];
						//get image url
						$event_img_query=mysql_query("SELECT p.guid FROM wp_kbpostmeta AS pm INNER JOIN wp_kbposts AS p ON pm.meta_value=p.ID
WHERE pm.post_id = '".$rs_event['ID']."'
AND pm.meta_key = '_thumbnail_id'");
						while ($event_img=mysql_fetch_array($event_img_query)) {
							$result1['image_url'] = $event_img['guid'];
						}
						//get availability date and price
						$event_ID = $rs_event['ID'];
						$current_timestamp = strtotime(date('Y-m-d'));
						$res_events_avai=mysql_query("SELECT * FROM `wp_kbst_availability` WHERE post_type='st_activity' and post_id=$event_ID and check_in='$current_timestamp'");	
						if (mysql_num_rows($res_events_avai)>0) {
							while ($res_events_avai_row=mysql_fetch_array($res_events_avai)) {		
								//$result1['id']=$res_events_avai_row['id'];	
								//$result1['post_id']=$res_events_avai_row['post_id'];	
								//$result1['check_in']=$res_events_avai_row['check_in'];	
								//$result1['check_out']=$res_events_avai_row['check_out'];
								$result1['adult_price']=$res_events_avai_row['adult_price'];	
								$result1['child_price']=$res_events_avai_row['child_price'];	
								$result1['infant_price']=$res_events_avai_row['infant_price'];
								$result1['calendar_type_price']=$res_events_avai_row['calendar_type_price'];
								}
								
							}
						array_push($result,$result1);
					}
					
				}
			}				
								
			if (count($result)>0) {				
				$result_ret = array('status' => 1,'data'=>$result);					
				$this->response($this->json($result_ret), 200);
			} else {						
				$error = array('status' => 0,'error'=>'No records found');	
				$this->response($this->json($error), 200); // If no records "No Content" status					
			}
			
		}
		//getfeaturedeventlist ends
		public function gettopdealseventlist() {
			
			$result=array();	
			$result1=array();		
			$res_events=mysql_query("SELECT * FROM `wp_kbposts` as a INNER JOIN `wp_kbst_activity` as b on a.id=b.post_id INNER JOIN `wp_kbcomments` as c on a.id=c.comment_post_ID WHERE a.post_type='st_activity' and a.post_status='publish' and c.comment_approved = 1 and c.comment_type='st_reviews' ORDER BY rand() LIMIT 10");	
			if (mysql_num_rows($res_events)>0) {
				while ($rs_event=mysql_fetch_array($res_events)) {
					//check top deals option (rate_review) from post meta table
					//$result1['rate_review']= $this->get_field_value($rs_event['ID'],'rate_review','wp_kbpostmeta');
					$result1['comment_rate']= $this->get_field_value('wp_kbcommentmeta','comment_id',$rs_event['comment_ID'],'comment_rate');
					//if($result1['comment_rate'] > 0){
						$result1['id']=$rs_event['ID'];	
						$result1['post_title']=$rs_event['post_title'];
						$result1['is_featured']= $this->get_field_value('wp_kbpostmeta','post_id',$rs_event['ID'],'is_featured');	
						$result1['address']= $this->get_field_value('wp_kbpostmeta','post_id',$rs_event['ID'],'address');	
						$result1['event_date']=$rs_event['check_in'];					
						//get image url
						$event_img_query=mysql_query("SELECT p.guid FROM wp_kbpostmeta AS pm INNER JOIN wp_kbposts AS p ON pm.meta_value=p.ID
WHERE pm.post_id = '".$rs_event['ID']."'
AND pm.meta_key = '_thumbnail_id'");
						while ($event_img=mysql_fetch_array($event_img_query)) {
							$result1['image_url'] = $event_img['guid'];
						}
						//get availability date and price
						$event_ID = $rs_event['ID'];
						$current_timestamp = strtotime(date('Y-m-d'));
						$res_events_avai=mysql_query("SELECT * FROM `wp_kbst_availability` WHERE post_type='st_activity' and post_id=$event_ID and check_in='$current_timestamp'");	
						if (mysql_num_rows($res_events_avai)>0) {
							while ($res_events_avai_row=mysql_fetch_array($res_events_avai)) {		
								//$result1['id']=$res_events_avai_row['id'];	
								//$result1['post_id']=$res_events_avai_row['post_id'];	
								//$result1['check_in']=$res_events_avai_row['check_in'];	
								//$result1['check_out']=$res_events_avai_row['check_out'];
								$result1['adult_price']=$res_events_avai_row['adult_price'];	
								$result1['child_price']=$res_events_avai_row['child_price'];	
								$result1['infant_price']=$res_events_avai_row['infant_price'];
								$result1['calendar_type_price']=$res_events_avai_row['calendar_type_price'];
							}
							
						}		
						array_push($result,$result1);
					//}
					
				}
			}				
								
			if (count($result)>0) {				
				$result_ret = array('status' => 1,'data'=>$result);					
				$this->response($this->json($result_ret), 200);
			} else {						
				$error = array('status' => 0,'error'=>'No records found');	
				$this->response($this->json($error), 200); // If no records "No Content" status					
			}
			
		}
		//gettopdealseventlist ends
		
		public function filter_events() {
			
			$result=array();	
			$result1=array();	
			$address= $this->_request['address'];
			$start_date = $this->_request['start_date'];
			$end_date = $this->_request['end_date'];	 
			//$address = 'Antigua and Barbuda';
			//$start_date = '2016-03-01';
			//$end_date = '2016-08-17';
			
			$res_events=mysql_query("SELECT a.ID,a.post_title FROM `wp_kbposts` as a INNER JOIN `wp_kbst_activity` as b on a.id=b.post_id WHERE a.post_type='st_activity' and a.post_status='publish' and b.check_in >= '$start_date' and b.address LIKE '%$address%'");	
			if (mysql_num_rows($res_events)>0) {
				while ($rs_event=mysql_fetch_array($res_events)) {		
					$result1['id']=$rs_event['ID'];	
					$result1['post_title']=$rs_event['post_title'];
					$result1['address']= $this->get_field_value('wp_kbpostmeta','post_id',$rs_event['ID'],'address');	
					$result1['is_featured']= $this->get_field_value('wp_kbpostmeta','post_id',$rs_event['ID'],$rs_event['ID'],'is_featured');	
					//$result1['rate_review']= $this->get_field_value('wp_kbpostmeta','post_id',$rs_event['ID'],'rate_review');	
					//get image url
						$event_img_query=mysql_query("SELECT p.guid FROM wp_kbpostmeta AS pm INNER JOIN wp_kbposts AS p ON pm.meta_value=p.ID
WHERE pm.post_id = '".$rs_event['ID']."'
AND pm.meta_key = '_thumbnail_id'");
						while ($event_img=mysql_fetch_array($event_img_query)) {
							$result1['image_url'] = $event_img['guid'];
						}
						
					//get availability date and price
						$event_ID = $rs_event['ID'];
						$current_timestamp = strtotime(date('Y-m-d'));
						$res_events_avai=mysql_query("SELECT * FROM `wp_kbst_availability` WHERE post_type='st_activity' and post_id=$event_ID and check_in='$current_timestamp'");	
						if (mysql_num_rows($res_events_avai)>0) {
							while ($res_events_avai_row=mysql_fetch_array($res_events_avai)) {		
								//$result1['id']=$res_events_avai_row['id'];	
								//$result1['post_id']=$res_events_avai_row['post_id'];	
								//$result1['check_in']=$res_events_avai_row['check_in'];	
								//$result1['check_out']=$res_events_avai_row['check_out'];
								$result1['adult_price']=$res_events_avai_row['adult_price'];	
								$result1['child_price']=$res_events_avai_row['child_price'];	
								$result1['infant_price']=$res_events_avai_row['infant_price'];
								$result1['calendar_type_price']=$res_events_avai_row['calendar_type_price'];
							}
							
						}		
							
					array_push($result,$result1);
				}
			}				
								
			if (count($result)>0) {				
				$result_ret = array('status' => 1,'data'=>$result);					
				$this->response($this->json($result_ret), 200);
			} else {						
				$error = array('status' => 0,'error'=>'No records found');	
				$this->response($this->json($error), 200); // If no records "No Content" status				
			}
			
		}
		//filter_events ends
	
	
		public function getevent_details() {
			
			$result=array();	
			$result1=array();	
			$result2=array();
			$result3=array();
			$event_ID = $this->_request['event_ID'];
			//$event_ID = 6300;
			$res_events=mysql_query("SELECT * FROM `wp_kbposts` as a INNER JOIN `wp_kbst_activity` as b on a.id=b.post_id WHERE a.post_type='st_activity' and a.post_status='publish' and a.ID=$event_ID");	
			if (mysql_num_rows($res_events)>0) {
				while ($rs_event=mysql_fetch_array($res_events)) {		
					$result['id']=$rs_event['ID'];	
					$result['post_title']=$rs_event['post_title'];
					$result['address']= $this->get_field_value('wp_kbpostmeta','post_id',$rs_event['ID'],'address');	
					$result['is_featured']= $this->get_field_value('wp_kbpostmeta','post_id',$rs_event['ID'],'is_featured');					
					$result['event_date']=$rs_event['check_in'];
					$result['event_time']= $this->get_field_value('wp_kbpostmeta','post_id',$rs_event['ID'],'activity-time');
					$result['max_people']=$rs_event['max_people'];
					$result['venue_facilities']= $this->get_field_value('wp_kbpostmeta','post_id',$rs_event['ID'],'venue-facilities');
					$result['post_content']=$rs_event['post_content'];
										
					//get image url
						$event_img_query=mysql_query("SELECT p.guid FROM wp_kbpostmeta AS pm INNER JOIN wp_kbposts AS p ON pm.meta_value=p.ID
WHERE pm.post_id = '".$rs_event['ID']."'
AND pm.meta_key = '_thumbnail_id'");
						while ($event_img=mysql_fetch_array($event_img_query)) {
							$result['image_url'] = $event_img['guid'];
						}
							
					//array_push($result,$result1);
					
					$event_ID = $rs_event['ID'];
					//get availability date and price
					
					$res_events_avai=mysql_query("SELECT * FROM `wp_kbst_availability` WHERE post_type='st_activity' and post_id=$event_ID");	
					if (mysql_num_rows($res_events_avai)>0) {
						while ($res_events_avai_row=mysql_fetch_array($res_events_avai)) {		
							$result2['id']=$res_events_avai_row['id'];	
							$result2['post_id']=$res_events_avai_row['post_id'];	
							$result2['check_in']=$res_events_avai_row['check_in'];	
							$result2['check_out']=$res_events_avai_row['check_out'];
							$result2['adult_price']=$res_events_avai_row['adult_price'];	
							$result2['child_price']=$res_events_avai_row['child_price'];	
							$result2['infant_price']=$res_events_avai_row['infant_price'];
							$result2['calendar_type_price']=$res_events_avai_row['calendar_type_price'];
							$result2['status']=$res_events_avai_row['status'];
							
							array_push($result1,$result2);
							
							}
							
						}
					//calendar availability ends
					
					$res_events_rev=mysql_query("SELECT * FROM `wp_kbcomments` WHERE comment_post_ID=$event_ID and comment_approved = 1 and comment_type='st_reviews'");	
					if (mysql_num_rows($res_events_rev)>0) {
						while ($res_events_rev_row=mysql_fetch_array($res_events_rev)) {
													
							$result3['comment_ID']=$res_events_rev_row['comment_ID'];	
							$result3['comment_author']=$res_events_rev_row['comment_author'];	
							$result3['comment_author_email']=$res_events_rev_row['comment_author_email'];	
							$result3['comment_content']=$res_events_rev_row['comment_content'];
							//get data from comments meta table
							$result3['comment_rate']= $this->get_field_value('wp_kbcommentmeta','comment_id',$res_events_rev_row['comment_ID'],'comment_rate');
							
							}
							
						}
					//event review ends
					
					}
				}	
								
			if (count($result)>0) {				
				$result_ret = array('status' => 1,'data'=>$result,'calendar_dates'=>$result1,'reviews'=>$result3);					
				$this->response($this->json($result_ret), 200);
			} else {						
				$error = array('status' => 0,'error'=>'No records found');	
				$this->response($this->json($error), 200); // If no records "No Content" status					
			}
			
		}
		//getevent_details ends
	
	
	public function addbooking() {
			
			//$post_author = $this->_request['post_author'];
			$user_login = $this->_request['user_login'];
			$post_date = date('Y-m-d H:i:s');
			$post_status = 'publish';
			$comment_status = 'closed';
			$ping_status = 'closed';
			$post_type = 'st_order';

			$token=rand(1000,9999);					
			$user_result = mysql_query("INSERT INTO wp_kbposts(post_author,post_date,post_status,comment_status,ping_status,post_type) VALUES('$user_login','$post_date','$comment_status','$ping_status','$post_type')") ;
			$id=mysql_insert_id();
			
			//insert values into wp_kbpostmeta table
			$booking_via = 'app';
			
			$status = $this->_request['status'];			
			$total_price = $this->_request['total_price'];
			$order_token_code = $this->_request['order_token_code'];			
			$item_id = $this->_request['item_id'];
			$item_price = $this->_request['item_price'];
			$item_number = $this->_request['item_number'];
			
			$rate_review = $this->_request['rate_review'];
			$item_post_type = $this->_request['item_post_type'];
			$type_price = $this->_request['type_price'];
			$adult_price = $this->_request['adult_price'];
			$child_price = $this->_request['child_price'];
			$infant_price = $this->_request['infant_price'];
			$adult_number = $this->_request['adult_number'];
			
			$child_number = $this->_request['child_number'];
			$infant_number = $this->_request['infant_number'];
			$type_activity = 'specific_date';
			$check_in = $this->_request['check_in'];
			$check_out = $this->_request['check_out'];
			$ori_price = $this->_request['ori_price'];
			$st_booking_post_type =  'st_activity';
			
			$st_booking_id = $this->_request['st_booking_id'];
			$user_id = $this->_request['user_id'];
			$payment_method = $this->_request['payment_method'];
			//$order_confirm_hash = $this->_request['order_confirm_hash'];
			
			$user_result_meta = mysql_query("INSERT INTO wp_kbpostmeta(post_id,meta_key,meta_value) VALUES('$id','booking_via','$booking_via'),('$id','status','$status'),('$id','total_price','$total_price'),('$id','order_token_code','$order_token_code'),('$id','item_id','$item_id'),('$id','item_price','$item_price'),('$id','item_number','$item_number'),'$id','rate_review','$rate_review'),('$id','item_post_type','$item_post_type'),('$id','type_price','$type_price'),('$id','adult_price','$adult_price'),('$id','child_price','$child_price'),'$id','infant_price','$infant_price'),('$id','adult_number','$adult_number'),('$id','child_number','$child_number'),('$id','infant_number','$infant_number'),'$id','check_in','$check_in'),('$id','check_out','$check_out'),('$id','ori_price','$ori_price'),('$id','st_booking_id','$st_booking_id'),('$id','payment_method','$payment_method')") ;
			
			$content='
			Hi '.$user_login.',<br /><br />
			
			Thank you for registering with us.<br /><br />
			
			Your Token is : '.$token.'<br />
			Please enter this token in the KoolBooking app to confirm verification.<br /><br />
			
			Regards,<br />
			Koolbooking.in
			';
			
			$to=$email;
			
			if ($id) {
				include "htmlMimeMail.php";
				$mail = new htmlMimeMail();
				$mail->setHTML($content);		
				$mail->setFrom('web@koolbooking.com');		
				$mail->setReturnPath('web@koolbooking.com');
						
				$mail->setSubject('Booking Confirmation');										
				//$mail->setText($text);	
				//$mail->setHeader();	
				$mail->setSMTPParams('smtp.gmail.com', 587, 'smtp.gmail.com', 1, 'web@koolbooking.com', 'Pay2Kool300');		
				
				if ($mail->send(array($to))) {

				}
				//send_mail($to,"Billing cancellation",$content,"From: v@inka.in\r\n"."Reply-To: v@inka.in\r\n");						                    	
				$result_ret = array('status' => 1,'postID'=>$id);		
				$this->response($this->json($result_ret), 200);
			} else {
				$error = array('status' => 0, "error" => "Record Not Added");
				$this->response($this->json($error), 200);
			}
					
		}	
		//booking ends
		
		
		public function purchase_history() {
			
			$post_author = $this->_request['post_author'];
			//$post_author = 3;
			$result=array();	
			$result1=array();
			$res_events=mysql_query("SELECT * FROM `wp_kbposts` as a INNER JOIN `wp_kbst_order_item_meta` as b on a.id=b.order_item_id WHERE a.post_type='st_order' and a.post_status='publish' and post_author='$post_author' ORDER BY a.ID DESC");	
			if (mysql_num_rows($res_events)>0) {
				while ($rs_event=mysql_fetch_array($res_events)) {		
					$result1['id']=$rs_event['ID'];	
					$result1['post_title']=$rs_event['post_title'];
					$result1['address']= $this->get_field_value('wp_kbpostmeta','post_id',$rs_event['st_booking_id'],'address');	
					$result1['is_featured']= $this->get_field_value('wp_kbpostmeta','post_id',$rs_event['st_booking_id'],$rs_event['st_booking_id'],'is_featured');	
					//$result1['rate_review']= $this->get_field_value('wp_kbpostmeta','post_id',$rs_event['st_booking_id'],$rs_event['st_booking_id'],'rate_review');	
					$result1['event_date']=$rs_event['check_in'];
					//get image url
						$event_img_query=mysql_query("SELECT p.guid FROM wp_kbpostmeta AS pm INNER JOIN wp_kbposts AS p ON pm.meta_value=p.ID
WHERE pm.post_id = '".$rs_event['ID']."'
AND pm.meta_key = '_thumbnail_id'");
						while ($event_img=mysql_fetch_array($event_img_query)) {
							$result1['image_url'] = $event_img['guid'];
						}
					
					
					//get availability date and price
					$event_ID = $rs_event['ID'];
					$res_events_avai=mysql_query("SELECT meta_key,meta_value FROM `wp_kbpostmeta` WHERE post_id=$event_ID");	
					if (mysql_num_rows($res_events_avai)>0) {
						while ($res_events_avai_row=mysql_fetch_array($res_events_avai)) {	
							$result1['status']=$this->get_field_value('wp_kbpostmeta','post_id',$event_ID,'status');	
							$result1['total_price']=$this->get_field_value('wp_kbpostmeta','post_id',$event_ID,'total_price');
							$result1['item_price']=$this->get_field_value('wp_kbpostmeta','post_id',$event_ID,'item_price');
							$result1['item_id']=$this->get_field_value('wp_kbpostmeta','post_id',$event_ID,'item_id');
							$result1['item_post_type']=$this->get_field_value('wp_kbpostmeta','post_id',$event_ID,'item_post_type');	
							$result1['type_price']=$this->get_field_value('wp_kbpostmeta','post_id',$event_ID,'type_price');
							$result1['adult_price']=$this->get_field_value('wp_kbpostmeta','post_id',$event_ID,'adult_price');
							$result1['child_price']=$this->get_field_value('wp_kbpostmeta','post_id',$event_ID,'child_price');						
							$result1['infant_price']=$this->get_field_value('wp_kbpostmeta','post_id',$event_ID,'infant_price');
							$result1['adult_number']=$this->get_field_value('wp_kbpostmeta','post_id',$event_ID,'adult_number');	
							$result1['child_number']=$this->get_field_value('wp_kbpostmeta','post_id',$event_ID,'child_number');
							$result1['infant_number']=$this->get_field_value('wp_kbpostmeta','post_id',$event_ID,'infant_number');
							$result1['check_in']=$this->get_field_value('wp_kbpostmeta','post_id',$event_ID,'check_in');	
							$result1['check_out']=$this->get_field_value('wp_kbpostmeta','post_id',$event_ID,'check_out');	
							$result1['ori_price']=$this->get_field_value('wp_kbpostmeta','post_id',$event_ID,'ori_price');
							$result1['payment_method']=$this->get_field_value('wp_kbpostmeta','post_id',$event_ID,'payment_method');
							
							}
							
						}
						
					array_push($result,$result1);
				}
			}				
								
			if (count($result)>0) {				
				$result_ret = array('status' => 1,'data'=>$result);					
				$this->response($this->json($result_ret), 200);
			} else {						
				$error = array('status' => 0,'error'=>'No records found');	
				$this->response($this->json($error), 200); // If no records "No Content" status					
			}
			
		}
		//purchase history ends
		

	/******** USER FUNCTIONS STARTS HERE ******************************/
		public function adduser() {
			include('../wp-includes/class-phpass.php');
			//declare PasswordHash function to compare received password with hashed password which is existing in table
			$wp_hasher = new PasswordHash(8, TRUE);
			
			$split_username = explode("@", $this->_request['user_email']);
			
			$user_login = $split_username[0];
			$user_pass = $wp_hasher->HashPassword($this->_request['user_pass']);
			$user_nicename = $split_username[0];
			$user_email = $this->_request['user_email'];
			$first_name = $this->_request['first_name'];
			$last_name = $this->_request['last_name'];
			$st_phone = $this->_request['st_phone'];
			$user_url = '';
			$user_registered = date('Y-m-d H:i:s');
			//$user_activation_key = $this->_request['user_activation_key'];
			$user_activation_key = '';
			$user_status = 0;
			$display_name = $this->_request['first_name'];
	
			if(!empty($user_email) && !empty($user_pass))
			{	
				$res_chk=mysql_query("select * from wp_kbusers where user_email='$user_email' and user_url='' and user_status=0");
				if (mysql_num_rows($res_chk)>0) {
						$error = array('status' => 0, "error" => "Email address already exist");
						$this->response($this->json($error), 200);
				
				} else {					
					
					$token=rand(1000,9999);					
					$user_result = mysql_query("INSERT INTO wp_kbusers(user_login,user_pass,user_nicename,user_email,user_url,user_registered,user_activation_key,user_status,display_name) VALUES('$user_login','$user_pass','$user_nicename','$user_email','$user_url','$user_registered','$token',$user_status,'$display_name')") ;
					$id=mysql_insert_id();					
					
					//insert user meta table
					$user_result_update1 = mysql_query("INSERT INTO wp_kbusermeta(user_id,meta_key,meta_value) VALUES ($id,'first_name','$first_name'),($id,'last_name','$last_name'),($id,'st_phone','$st_phone')") ;
					
					if ($id) {
						$result_ret = array('status' => 1,'userID'=>$id);		
						$this->response($this->json($result_ret), 200);
					}else {
						$error = array('status' => 0, "error" => "Record Not Added");
						$this->response($this->json($error), 200);
					}
					
				}
				
			} else {
				$error = array('status' => 0, "error" => "Name and email are required");
				$this->response($this->json($error), 200);
			}
		}	
		//add user ends
		
		public function edituser() {
			include('../wp-includes/class-phpass.php');
			//declare PasswordHash function to compare received password with hashed password which is existing in table
			$wp_hasher = new PasswordHash(8, TRUE);
			
			$user_id = $this->_request['user_id'];
			
			//$user_login = $this->_request['user_login'];
			$user_pass = $wp_hasher->HashPassword($this->_request['user_pass']);
			//$user_nicename = $this->_request['user_login'];
			$user_email = $this->_request['user_email'];
			$first_name = $this->_request['first_name'];
			$last_name = $this->_request['last_name'];
			$st_phone = $this->_request['st_phone'];
			$user_url = '';
			$user_registered = date('Y-m-d H:i:s');
			//$user_activation_key = $this->_request['user_activation_key'];
			$user_activation_key = '';
			$user_status = 0;
			//$display_name = $this->_request['user_login'];
	
			if(!empty($user_email) && !empty($user_pass))
			{	
				$user_result = mysql_query("UPDATE wp_kbusers SET user_pass='$user_pass',user_email='$user_email' WHERE ID='$user_id'") ;
				
				//update user meta table
				$user_result_update1 = mysql_query("UPDATE wp_kbusermeta SET meta_value='$first_name' WHERE user_id='$user_id' and meta_key='first_name'") ;
				$user_result_update2 = mysql_query("UPDATE wp_kbusermeta SET meta_value='$last_name' WHERE user_id='$user_id' and meta_key='last_name'") ;
				$user_result_update3 = mysql_query("UPDATE wp_kbusermeta SET meta_value='$st_phone' WHERE user_id='$user_id' and meta_key='st_phone'") ;
				            	
				$result_ret = array('status' => 1,'userID'=>$user_id);		
				$this->response($this->json($result_ret), 200);
			} else {
				$error = array('status' => 0, "error" => "Record Not Updated");
				$this->response($this->json($error), 200);
			}
		}	
		//edit user ends
		
		public function upload_useravatar() {
			
			$post_author = $this->_request['post_author'];
			$profile_image = $_FILES["file"]["name"];
			//set image name
			if(isset($profile_image) && ($profile_image !="") ) {				
				//print_r($_FILES["file"]);				
				$split_name = explode(".", $profile_image);				
			
				$post_date = date('Y-m-d H:i:s');
				$post_date_gmt = date('Y-m-d H:i:s');
				$post_title = $split_name[0];
				$post_status = 'inherit';
				$comment_status = 'open';
				$ping_status = 'closed';
				$post_name = $split_name[0];
				$post_modified = date('Y-m-d H:i:s');
				$post_modified_gmt = date('Y-m-d H:i:s');
				$post_parent = 0;
				//$guid = 'http://koolbooking.com/wp-content/uploads/2016/02/'.$profile_image;
				$guid = '../wp-content/uploads/app_images/'.$profile_image;
				$full_url = $site_url.'wp-content/uploads/app_images/'.$profile_image;
				$post_type = 'attachment';
				$post_mime_type = 'image/jpeg';
				
				//image uploaded
				$sourcePath = $_FILES['file']['tmp_name'];   // Storing source path of the file in a variable
				$targetPath = $guid;  // Target path where file is to be stored
				$moved = move_uploaded_file($sourcePath,$targetPath) ; //  Moving Uploaded file			
				if( $moved ) {
				  echo "Successfully uploaded";         
				} else {
					echo $sourcePath;
					echo "<br />";
					echo $targetPath;
				  echo "Not uploaded because of error #".$_FILES["file"]["error"];
				}

				//insert into post table
				$post_result = mysql_query("INSERT INTO wp_kbposts(post_author,post_date,post_date_gmt,post_title,post_status,comment_status,ping_status,post_name,post_modified,post_modified_gmt,post_parent,guid,post_type,post_mime_type) VALUES('$post_author','$post_date','$post_date_gmt','$post_title','$post_status','$comment_status','$ping_status','$post_name','$post_modified','$post_modified_gmt','$post_parent','$full_url','$post_type','$post_mime_type')") ;
				$id=mysql_insert_id();
				//insert into wp_kbusermeta table
				$post_result = mysql_query("DELETE from wp_kbusermeta where meta_key='st_avatar' and user_id='$post_author'") ;	
				$post_result = mysql_query("INSERT INTO wp_kbusermeta(user_id,meta_key,meta_value) VALUES('$post_author','st_avatar','$id')") ;						
			
				
				if ($id) {				
					$result_ret = array('status' => 1,'avatar_url'=>$full_url);		
					$this->response($this->json($result_ret), 200);
				} else {						
					$error = array('status' => 0,'error'=>'Image is not uploaded');	
					$this->response($this->json($error), 200); // If no records "No Content" status				
				}
			}
		//check image condition ends	
			else {						
				$error = array('status' => 0,'error'=>'Please choose an Image');	
				$this->response($this->json($error), 200); // If no records "No Content" status				
			}			
			
			
		}
		//upload_useravatar ends
		
		public function getuser_details() {
			
			$result=array();	
			//$result1=array();		
			$user_id = $this->_request['user_id'];
			//$user_ID = 3;
			$res_events=mysql_query("SELECT * FROM `wp_kbusers` WHERE user_status=0 and ID=$user_id");	
			if (mysql_num_rows($res_events)>0) {
				while ($rs_event=mysql_fetch_array($res_events)) {		
					$result['id']=$rs_event['ID'];	
					$result['user_email'] = $rs_event['user_email'];
					$result['user_url']= $rs_event['user_url'];
					$result['display_name']= $rs_event['display_name'];
					$result['first_name']= $this->get_field_value('wp_kbusermeta','user_id',$rs_event['ID'],'first_name');
					$result['last_name']= $this->get_field_value('wp_kbusermeta','user_id',$rs_event['ID'],'last_name');
					$result['st_phone']= $this->get_field_value('wp_kbusermeta','user_id',$rs_event['ID'],'st_phone');
					
					//get image url
						$event_img_query=mysql_query("SELECT p.guid FROM wp_kbusermeta AS pm INNER JOIN wp_kbposts AS p ON pm.meta_value=p.ID
WHERE pm.user_id = '".$rs_event['ID']."'
AND pm.meta_key = 'st_avatar' order by umeta_id desc limit 1");
						while ($event_img=mysql_fetch_array($event_img_query)) {
							$result['image_url'] = $event_img['guid'];
						}
					
					
				}
			}				
								
			if (count($result)>0) {				
				$result_ret = array('status' => 1,'data'=>$result);					
				$this->response($this->json($result_ret), 200);
			} else {						
				$error = array('status' => 0,'error'=>'No records found');	
				$this->response($this->json($error), 200); // If no records "No Content" status				
			}
			
		}
		//getuser_details ends
		
		public function insert_notification() {
			
			$user_id = $this->_request['user_id'];
			$notification = $this->_request['notification'];
		
			if(!empty($user_id) && !empty($notification))
			{	
				$user_result_select = mysql_query("DELETE FROM wp_kbusermeta WHERE user_id='$user_id' and meta_key='notification'") ;
				$user_result = mysql_query("INSERT wp_kbusermeta (user_id,meta_key,meta_value) VALUES('$user_id','notification','$notification') ") ;
				                  	
				$result_ret = array('status' => 1,'userID'=>$user_id);		
				$this->response($this->json($result_ret), 200);
			} else {
				$error = array('status' => 0, "error" => "Record Not Added");
				$this->response($this->json($error), 200);
			}
		}	
		//insert notification ends
		
		public function get_notification() {
			
			$user_id = $this->_request['user_id'];
		
			if(!empty($user_id))
			{	
				//get notification
				$user_result_select = mysql_query("SELECT * FROM wp_kbusermeta WHERE user_id='$user_id' and meta_key='notification'") ;
				if (mysql_num_rows($user_result_select)>0) {
					$rs_event=mysql_fetch_array($user_result_select);
					$notification = $rs_event['meta_value'];
					$result_ret = array('status' => 1,'notification'=>$notification);		
					$this->response($this->json($result_ret), 200);
				} else {
					$result_ret = array('status' => 1,'notification'=>'no');		
					$this->response($this->json($result_ret), 200);
				}      	
				
			} else {
				$error = array('status' => 0, "error" => "user id must be needed");
				$this->response($this->json($error), 200);
			}
		}	
		//notification status ends
				

/************************************************ USER FUNCTIONS ENDS HERE ****************************************************************/
		

		public function get_logo_video_url() {
				
				$video_result = array();
				$image_result = array();
				$redirect_result = array();
				
				$user_result_select = mysql_query("SELECT * FROM wp_kboptions WHERE option_name='android_keys'") ;
				if (mysql_num_rows($user_result_select)>0) {
					
					$rs_event=mysql_fetch_array($user_result_select);
					$json_data = $rs_event['option_value'];
					$obj = unserialize($json_data);	
					//print_r($obj);						  //a:2:{s:16:"app_powered_logo";s:62:"http://koolbooking.com/wp-content/themes/traveler/img/logo.png";s:15:"app_youtube_url";s:43:"https://www.youtube.com/watch?v=aloodMsn5Ks";}
					$app_powered_logo = $obj['app_powered_logo'];
					$video_result[] = $obj['app_youtube_url1'];
					$video_result[] = $obj['app_youtube_url2'];
					$video_result[] = $obj['app_youtube_url3'];
					$video_result[] = $obj['app_youtube_url4'];
					$video_result[] = $obj['app_youtube_url5'];
					//image and redirect urls
					$image_result[] = $obj['app_image_url1'];
					$redirect_result[] = $obj['app_image_re_url1'];
					$image_result[] = $obj['app_image_url2'];
					$redirect_result[] = $obj['app_image_re_url2'];
					$image_result[] = $obj['app_image_url3'];
					$redirect_result[] = $obj['app_image_re_url3'];
					$image_result[] = $obj['app_image_url4'];
					$redirect_result[] = $obj['app_image_re_url4'];
					$image_result[] = $obj['app_image_url5'];
					$redirect_result[] = $obj['app_image_re_url5'];
					
					
					
					$result_ret = array('status' => 1,'app_powered_logo'=>$app_powered_logo,'app_youtube_url'=>$video_result,'app_image_url'=>$image_result,'app_image_re_url1'=>$redirect_result);		
					$this->response($this->json($result_ret), 200);
				} else {
					$result_ret = array('status' => 1,'error'=>'No record found');		
					$this->response($this->json($result_ret), 200);
				}      	
		}	
		//get powered by logo url and youtube video url status ends
		
		
		private function json($data){
			if(is_array($data)){
				return json_encode($data);
			}
		}
	}
	
	// Initiiate Library	
	
	$api = new API;
	$api->processApi();		
	
?>