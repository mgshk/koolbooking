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
			$res_events=mysql_query("SELECT * FROM `wp_kbposts` as a INNER JOIN `wp_kbst_activity` as b on a.id=b.post_id WHERE a.post_type='st_activity' and a.post_status='publish' ORDER BY RAND()");	
			//$res_events=mysql_query("SELECT * FROM `wp_kbposts` as a INNER JOIN `wp_kbst_activity` as b on a.id=b.post_id INNER JOIN `wp_kbcomments` as c on a.id=c.comment_post_ID WHERE a.post_type='st_activity' and a.post_status='publish' ORDER BY rand() LIMIT 10");
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
			//$res_events=mysql_query("SELECT * FROM `wp_kbposts` as a INNER JOIN `wp_kbst_activity` as b on a.id=b.post_id WHERE a.post_type='st_activity' and a.post_status='publish' ORDER BY RAND() LIMIT 10");	
			$res_events=mysql_query("SELECT a.ID,a.post_title,c.comment_ID FROM `wp_kbposts` as a LEFT JOIN `wp_kbst_activity` as b on a.id=b.post_id LEFT JOIN `wp_kbcomments` as c on a.id=c.comment_post_ID WHERE a.post_type='st_activity' and a.post_status='publish' ORDER BY rand()");	
			if (mysql_num_rows($res_events)>0) {
				while ($rs_event=mysql_fetch_array($res_events)) {
					//check featured option is on from post meta table
					$result1['is_featured']= $this->get_field_value('wp_kbpostmeta','post_id',$rs_event['ID'],'is_featured');	
					if($result1['is_featured'] == 'on'){
						$result1['id']=$rs_event['ID'];	
						$result1['post_title']=$rs_event['post_title'];
						$result1['address']= $this->get_field_value('wp_kbpostmeta','post_id',$rs_event['ID'],'address');						
						$result1['comment_rate']= $this->get_field_value('wp_kbcommentmeta','comment_id',$rs_event['comment_ID'],'comment_rate');	
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
			$res_events=mysql_query("SELECT a.ID,a.post_title,c.comment_ID FROM `wp_kbposts` as a INNER JOIN `wp_kbst_activity` as b on a.id=b.post_id INNER JOIN `wp_kbcomments` as c on a.id=c.comment_post_ID WHERE a.post_type='st_activity' and a.post_status='publish' and c.comment_approved = 1 and c.comment_type='st_reviews' ORDER BY rand() LIMIT 10");	
			if (mysql_num_rows($res_events)>0) {
				while ($rs_event=mysql_fetch_array($res_events)) {
					//check top deals option (rate_review) from post meta table
					//$result1['rate_review']= $this->get_field_value($rs_event['ID'],'rate_review','wp_kbpostmeta');
					$result1['comment_rate']= $this->get_field_value('wp_kbcommentmeta','comment_id',$rs_event['comment_ID'],'comment_rate');
					if($result1['comment_rate'] > 0 && $result1['comment_rate'] != "" && $result1['comment_rate'] != NULL){
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
		//gettopdealseventlist ends
		
		public function filter_events() {
			
			$result=array();	
			$result1=array();	
			$address= $this->_request['address'];
			
			//$res_events=mysql_query("SELECT a.ID,a.post_title FROM `wp_kbposts` as a INNER JOIN `wp_kbst_activity` as b on a.id=b.post_id WHERE a.post_type='st_activity' and a.post_status='publish' and b.address LIKE '%$address%'");	
			$res_events=mysql_query("SELECT a.ID,a.post_title,c.comment_ID FROM `wp_kbposts` as a LEFT JOIN `wp_kbst_activity` as b on a.id=b.post_id LEFT JOIN `wp_kbcomments` as c on a.id=c.comment_post_ID WHERE a.post_type='st_activity' and a.post_status='publish' and b.address LIKE '%$address%' ORDER BY rand()");
			if (mysql_num_rows($res_events)>0) {
				while ($rs_event=mysql_fetch_array($res_events)) {		
					$result1['id']=$rs_event['ID'];	
					$result1['post_title']=$rs_event['post_title'];
					$result1['address']= $this->get_field_value('wp_kbpostmeta','post_id',$rs_event['ID'],'address');	
					$result1['is_featured']= $this->get_field_value('wp_kbpostmeta','post_id',$rs_event['ID'],'is_featured');	
					$result1['comment_rate']= $this->get_field_value('wp_kbcommentmeta','comment_id',$rs_event['comment_ID'],'comment_rate');
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
					$event_img_query=mysql_query("SELECT p.guid FROM wp_kbpostmeta AS pm INNER JOIN wp_kbposts AS p ON pm.meta_value=p.ID WHERE pm.post_id = '".$rs_event['ID']."' AND pm.meta_key = '_thumbnail_id'");
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
	
	
	public function addbooking_checkout() {
			
			$user_id = $this->_request['user_id'];
			
			$post_date = date('Y-m-d H:i:s');
			$post_status = 'publish';
			$comment_status = 'closed';
			$ping_status = 'closed';
			$post_type = 'st_order';

			$token=rand(1000,9999);					
			$user_result = mysql_query("INSERT INTO wp_kbposts(post_author,post_date,post_status,comment_status,ping_status,post_type) VALUES('$user_id','$post_date','$post_status','$comment_status','$ping_status','$post_type')") ;
			$id=mysql_insert_id();
			
			//insert values into wp_kbpostmeta table
			$booking_via = 'app';			
			$status = 'pending';
			$type_activity = 'specific_date';
			$st_booking_post_type =  'st_activity';			
			$order_token_code = substr(str_shuffle(str_repeat("0123456789abcdefghijklmnopqrstuvwxyz", 8)), 0, 8);
			$item_post_type = 'st_activity';			
						
			$item_id = $this->_request['item_id']; // event ID 
			$st_booking_id = $this->_request['item_id']; 		
			
			$type_price = $this->_request['type_price'];  
			$adult_price = $this->_request['adult_price'];
			$item_price = $this->_request['adult_price'];
			$child_price = $this->_request['child_price'];
			$infant_price = $this->_request['infant_price'];
			$adult_number = $this->_request['adult_number'];			
			$child_number = $this->_request['child_number'];
			$infant_number = $this->_request['infant_number'];
			
			$item_number = $adult_number + $child_number + $infant_number;
			
			$check_in = $this->_request['check_in']; //may be the same date of event
			$check_out = $this->_request['check_in']; //may be the same date of event
			$ori_price = $this->_request['ori_price']; // without discount and tax --- origin price
			$total_price = $this->_request['total_price']; // final price
			
			$payment_method = $this->_request['payment_method'];  // like paypal 
			//$order_confirm_hash = $this->_request['order_confirm_hash'];
			
			$user_result_meta = mysql_query("INSERT INTO wp_kbpostmeta(post_id,meta_key,meta_value) VALUES('$id','booking_via','$booking_via'),('$id','status','$status'),('$id','total_price','$total_price'),('$id','order_token_code','$order_token_code'),('$id','item_id','$item_id'),('$id','item_price','$item_price'),('$id','item_number','$item_number'),('$id','item_post_type','$item_post_type'),('$id','type_price','$type_price'),('$id','adult_price','$adult_price'),('$id','child_price','$child_price'),'$id','infant_price','$infant_price'),('$id','adult_number','$adult_number'),('$id','child_number','$child_number'),('$id','infant_number','$infant_number'),'$id','check_in','$check_in'),('$id','check_out','$check_out'),('$id','ori_price','$ori_price'),('$id','st_booking_id','$st_booking_id'),('$id','payment_method','$payment_method')");
						
			if ($id) {					                    	
				$result_ret = array('status' => 1,'orderID'=>$id);		
				$this->response($this->json($result_ret), 200);
			} else {
				$error = array('status' => 0, "error" => "Record Not Added");
				$this->response($this->json($error), 200);
			}
					
		}	
		//booking checkout ends
		
		public function addbooking_payment_success() {
			
			$orderID = $this->_request['orderID']; // send again the ID which got the response from addbooking_checkout() function 
			$payment_reference_id = $this->_request['payment_reference_id']; // reference code received from paypal or some other payment gateway
						 
			$user_result_meta = mysql_query("UPDATE wp_kbpostmeta SET meta_value='completed' where post_id=$orderID and meta_key='status'");
			$user_result_meta = mysql_query("INSERT INTO wp_kbpostmeta(post_id,meta_key,meta_value) VALUES('$orderID','payment_reference_id','$payment_reference_id')");
			
			//get user details 
			$first_name= $this->get_field_value('wp_kbpostmeta','post_id',$orderID,'st_first_name');
			$last_name= $this->get_field_value('wp_kbpostmeta','post_id',$orderID,'st_last_name');
			$user_email= $this->get_field_value('wp_kbpostmeta','post_id',$orderID,'st_email');
			$user_phone= $this->get_field_value('wp_kbpostmeta','post_id',$orderID,'st_phone');
			
			//get event details
			$item_id= $this->get_field_value('wp_kbpostmeta','post_id',$orderID,'item_id');
			$st_booking_id= $item_id;
			//get event details from item_id
			$event_title= $this->get_field_value('wp_kbposts','ID',$item_id,'post_content'); 
			$address= $this->get_field_value('wp_kbpostmeta','post_id',$item_id,'address'); 
			$contact_email= $this->get_field_value('wp_kbpostmeta','post_id',$item_id,'contact_email');
			$contact_phone= $this->get_field_value('wp_kbpostmeta','post_id',$item_id,'contact_phone');
			$check_in= $this->get_field_value('wp_kbpostmeta','post_id',$item_id,'check_in');
						
			//get booking details
			$payment_method= $this->get_field_value('wp_kbpostmeta','post_id',$orderID,'payment_method');
			$ori_price= $this->get_field_value('wp_kbpostmeta','post_id',$orderID,'ori_price');
			$total_price= $this->get_field_value('wp_kbpostmeta','post_id',$orderID,'total_price');
			$item_price= $this->get_field_value('wp_kbpostmeta','post_id',$orderID,'item_price');
			$adult_price= $this->get_field_value('wp_kbpostmeta','post_id',$orderID,'adult_price');
			$child_price= $this->get_field_value('wp_kbpostmeta','post_id',$orderID,'child_price');
			$infant_price= $this->get_field_value('wp_kbpostmeta','post_id',$orderID,'infant_price');
			$adult_number= $this->get_field_value('wp_kbpostmeta','post_id',$orderID,'adult_number');
			$child_number= $this->get_field_value('wp_kbpostmeta','post_id',$orderID,'child_number');
			$infant_number= $this->get_field_value('wp_kbpostmeta','post_id',$orderID,'infant_number');
			
			
			
			//get image url
			$event_img_query=mysql_query("SELECT p.guid FROM wp_kbpostmeta AS pm INNER JOIN wp_kbposts AS p ON pm.meta_value=p.ID WHERE pm.post_id = '".$item_id."' AND pm.meta_key = '_thumbnail_id'");
			while ($event_img=mysql_fetch_array($event_img_query)) {
				$event_image = $event_img['guid'];
			}
			
			//
			$payment_method = $this->get_field_value('wp_kbpostmeta','post_id',$orderID,'payment_method');
			
			$content='
			<table id="booking-infomation" class="wrapper" style="width: 1000px;" width="90%" cellspacing="0" align="center">
<tbody>
<tr>
<td style="padding: 20px 10px; background: #ED8323;" width="20%"><a href="http://koolbooking.com"> <img class="alignnone wp-image-7442 size-full" src="http://koolbooking.com/wp-content/themes/traveler/img/logo.png" alt="logo" width="110" height="40" /> </a></td>
<td style="background: #ed8323 none repeat scroll 0 0; color: #fff; font-size: 17px; padding: 21px 45px; text-align: right;" width="80%"><a style="color: #fff; padding-left: 12px; text-decoration: none;" href="http://koolbooking.com/hotels/">Hotel</a> <a style="color: #fff; padding-left: 20px; text-decoration: none;" href="http://koolbooking.com/activities/">Activity</a> <a style="color: #fff; padding-left: 20px; text-decoration: none;" href="http://koolbooking.com/events/">Event</a></td>
</tr>
</tbody>
</table>
<table id="" class="wrapper" style="padding-top: 70px; width: 1000px; color: #666;" width="90%" cellspacing="0" align="center">
<tbody>
<tr>
<td style="padding-bottom: 20px; font-size: 20px;"><strong style="font-size: 30px;">Hello '.$first_name.' '.$last_name.'</strong>,</td>
</tr>
<tr>
<td>Thank you for booking with us. Below are your booking details:</td>
</tr>
</tbody>
</table>
<table id="" class="wrapper" style="width: 1000px; color: #666; border: 1px solid #666; margin-top: 70px;" width="90%" cellspacing="0" align="center">
<tbody>
<tr>
<td width="65%"><img src='.$event_image.' width="250"/></td>
<td width="35%">
<table style="width: 100%; text-align: left; padding-left: 19px; top: 20px; color: #666;">
<tbody>
<tr>
<td style="font-size: 22px; font-weight: bold;" colspan="2">'.$event_title.'</td>
</tr>
<tr>
<td style="padding-top: 10px;"><strong>Date: </strong></td>
<td style="padding-top: 10px;"><span style="text-decoration: underline;">'.$check_in.'</span></td>
</tr>
<tr>
<td style="padding-top: 20px;"><strong>Address: </strong></td>
<td style="padding-top: 20px;">'.$address.'</td>
</tr>
<tr>
<td style="padding-top: 10px;"><strong>Email: </strong></td>
<td style="padding-top: 10px;"><span style="text-decoration: underline;">'.$contact_email.'</span></td>
</tr>
<tr>
<td style="padding-top: 10px;"><strong>Phone: </strong></td>
<td style="padding-top: 10px;"><span style="text-decoration: underline;">'.$contact_phone.'</span></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table id="" class="wrapper" style="padding-top: 40px; width: 1000px; color: #666;" width="90%" cellspacing="0" align="center">
<tbody>
<tr>
<td style="padding-bottom: 20px; text-align: center; font-size: 30px; font-weight: bold;">Client Informations</td>
</tr>
<tr>
<td>
<table style="color: #666; border-collapse: collapse;" border="1px" width="100%">
<tbody>
<tr>
<td style="text-align: center; padding: 10px; font-weight: bold;" colspan="2" width="50%">Booking Code: <span style="background-color: #ccffcc; color: #339933; padding: 3px 10px;"> '.$st_booking_id.' </span></td>
<td style="text-align: center; padding: 10px; font-weight: bold;" colspan="2" width="50%">Status: <span style="background-color: #ccffcc; color: #339933; padding: 3px 10px;"> Completed </span></td>
</tr>
<tr>
<td style="padding: 10px 20px;"><strong>First Name:</strong></td>
<td style="padding: 10px 20px; ; color: #cc3333; border-color: #666;"><strong>'.$first_name.'</strong></td>
<td style="padding: 10px 20px;"><strong>Last Name:</strong></td>
<td style="padding: 10px 20px; ; color: #cc3333; border-color: #666;"><strong>'.$last_name.'</strong></td>
</tr>
<tr>
<td style="padding: 10px 20px;"><strong>Phone:</strong></td>
<td style="padding: 10px 20px; ; color: #cc3333; border-color: #666;">'.$user_phone.'</td>
<td style="padding: 10px 20px;"><strong>Email:</strong></td>
<td style="padding: 10px 20px;">'.$user_email.'</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table id="" class="wrapper" style="padding-top: 40px; width: 1000px; color: #666;" width="90%" cellspacing="0" align="center">
<tbody>
<tr>
<td style="padding-bottom: 20px; text-align: center; font-size: 30px; font-weight: bold;">Booking Details</td>
</tr>
<tr>
<td>
<div style="text-align: center; padding: 10px 0px; font-weight: bold; border: solid 1px #666;">Payment Method: '.$payment_method.'</div>
<div style="padding: 10px 0px; border-left: solid 1px #666; border-right: solid 1px #666; border-bottom: solid 1px #666;">
<table style="padding: 15px; color: #666;" width="100%">
<tbody>
<tr>
<td width="25%"> </td>
<td width="25%"> </td>
<td style="padding-bottom: 20px;" width="25%">Adult Price:</td>
<td style="text-align: right;" width="25%"><strong>'.$adult_price.'</strong></td>
</tr>
<tr>
<td width="25%"> </td>
<td width="25%"> </td>
<td style="padding-bottom: 20px;" width="25%">Child Price:</td>
<td style="text-align: right;" width="25%"><strong>'.$child_price.'</strong></td>
</tr>
<tr>
<td width="25%"> </td>
<td width="25%"> </td>
<td style="padding-bottom: 20px;" width="25%">Infant Price:</td>
<td style="text-align: right;" width="25%"><strong>'.$infant_price.'</strong></td>
</tr>

<tr>
<td width="25%"> </td>
<td width="25%"> </td>
<td style="padding-bottom: 20px;" width="25%">Number of Adult:</td>
<td style="text-align: right;" width="25%"><strong>'.$adult_number.'</strong></td>
</tr>
<tr>
<td width="25%"> </td>
<td width="25%"> </td>
<td style="padding-bottom: 20px;" width="25%">Number of Child:</td>
<td style="text-align: right;" width="25%"><strong>'.$child_number.'</strong></td>
</tr>
<tr>
<td width="25%"> </td>
<td width="25%"> </td>
<td style="padding-bottom: 20px;" width="25%">Number of Infant:</td>
<td style="text-align: right;" width="25%"><strong>'.$infant_number.'</strong></td>
</tr>

<tr>
<td width="25%"> </td>
<td width="25%"> </td>
<td style="padding-bottom: 20px;" width="25%">Origin Price:</td>
<td style="text-align: right;" width="25%"><strong>'.$ori_price.'</strong></td>
</tr>
<tr>
<td width="25%"> </td>
<td width="25%"> </td>
<td style="padding-bottom: 20px;" width="25%"><strong>Pay Amount:</strong></td>
<td style="text-align: right;" width="25%"><strong style="font-size: 30px; color: #cc3333;">'.$total_price.'</strong></td>
</tr>
</tbody>
</table>
</div>
</td>
</tr>
</tbody>
</table>
<table id="" class="wrapper" style="padding-top: 40px; width: 1000px; color: #666;" width="90%" cellspacing="0" align="center">
<tbody>
<tr>
<td style="padding-bottom: 20px; font-size: 20px; text-align: center;"><strong style="font-size: 25px;">Cancellation/ Amendment policy</strong></td>
</tr>
<tr>
<td><strong> Individual reservations: </strong> <br /> <span style="padding-left: 20px;"> + For Cancellations/ amendments made after 12 noon, 3 days prior to check-in date, One night’s room rate is charged to the credit card </span> <br /> <span style="padding-left: 20px;"> + For No shows and early check outs, One night’s room rate is charged to the credit card. </span></td>
</tr>
<tr>
<td><strong> Groups / Conference bookings: </strong> <br /> <span style="padding-left: 20px;"> + In case there is any no-show or cancellation/amendment of the conference/group (in part or full), within 15 days or less from the date of check in, a retention charge will be levied. </span> <br /> <span style="padding-left: 20px;"> + The retention charge will be calculated as follows - Number of rooms being canceled/no-shows X 1 night X applicable daily rate per room for the conference/group. </span> <br /> <span style="padding-left: 20px;"> + In case of Early check out retention will be charged for those nights booked, now being released due to the early check out. </span></td>
</tr>
</tbody>
</table>
<table id="" class="wrapper" style="padding-top: 65px; width: 1000px; color: #666;" width="90%" cellspacing="0" align="center">
<tbody>
<tr>
<td style="padding-bottom: 20px; text-align: center;"><a style="background-color: #ed8323; border-radius: 5px; color: #fff; font-family: tahoma; font-size: 14px; font-weight: bold; margin-left: 10px; padding: 10px 30px; text-decoration: none;" href="[st_email_booking_url_booking_history]" target="_blank"> BOOKING HISTORY </a></td>
</tr>
</tbody>
</table>
<table style="color: #818181; width: 1000px;" width="100%" cellspacing="0" align="center">
<tbody>
<tr>
<td style="padding-top: 30px; padding-bottom: 20px;" align="center"><hr style="color: #ddd;" /></td>
</tr>
<tr>
<td align="center"><a href="http://koolbooking.com"><img class="alignnone wp-image-6292" src="http://koolbooking.com/wp-content/themes/traveler/img/email/fa.png" alt="eb_face" width="35" height="35" /></a> <a style="margin: 5px;" href="http://koolbooking.com"><img class="alignnone wp-image-6296" src="http://koolbooking.com/wp-content/themes/traveler/img/email/tw.png" alt="" width="35" height="35" /></a> <a style="margin: 5px;" href="http://koolbooking.com"><img class="alignnone wp-image-6295" src="http://koolbooking.com/wp-content/themes/traveler/img/email/gg.png" alt="" width="35" height="35" /></a></td>
</tr>
<tr>
<td style="padding-top: 20px;" align="center">
<p>Booking, reviews and advices on hotels, resorts, flights, vacation rentals, travel packages, and lots more!</p>
<ul style="list-style: none; text-align: center;">
<li style="display: inline-block;"><a style="color: #818181; text-decoration: none;" href="#">About us</a> |</li>
<li style="display: inline-block;"><a style="color: #818181; text-decoration: none;" href="#">Contact us</a> |</li>
<li style="display: inline-block;"><a style="color: #818181; text-decoration: none;" href="#">News</a></li>
</ul>
</td>
</tr>
</tbody>
</table>';
			
			$to=$user_email;
			
			if ($orderID) {
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
					//send_mail($to,"Billing cancellation",$content,"From: v@inka.in\r\n"."Reply-To: v@inka.in\r\n");	
					$result_ret = array('status' => 1,'orderID'=>$orderID);		
					$this->response($this->json($result_ret), 200);
				} else {
					$error = array('status' => 0, "error" => "Record Not Added");
					$this->response($this->json($error), 200);
			}
					
		}	
	}
		//booking payment success ends
		
		public function addbooking_payment_failed() {
			$orderID = $this->_request['orderID']; // send again the ID which got the response from addbooking_checkout() function 
			$payment_reference_id = $this->_request['payment_reference_id']; // reference code received from paypal or some other payment gateway
						 
			$user_result_meta = mysql_query("UPDATE wp_kbpostmeta SET meta_value='failed' where post_id=$orderID and meta_key='status'");
			$user_result_meta = mysql_query("INSERT INTO wp_kbpostmeta(post_id,meta_key,meta_value) VALUES('$orderID','payment_reference_id','$payment_reference_id')");
			$id=mysql_insert_id();
			if($id){
				$result_ret = array('status' => 1,'orderID'=>$orderID);		
				$this->response($this->json($result_ret), 200);
			} else {
				$error = array('status' => 0, "error" => "Record Not Added");
				$this->response($this->json($error), 200);
			}
		}
		
		//booking payment failed ends
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