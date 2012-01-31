<?php
class Course_model extends CI_Model {

	public function __construct()
	{
		$this->load->database();
	}

	public function get_courses()
	{
		
		$query = $this->db->get('courses');
		return $query->result_array();
	}	
}
?>
