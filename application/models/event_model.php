<?php
class Event_model extends CI_Model {

	public function __construct()
	{
		$this->load->database();
	}

	public function get_events()
	{
		$this->db->select('*');
		
		$this->db->order_by('when,time', 'desc');		
		$query = $this->db->get('events');
		
		return $query->result_array();
		
	}	
}
?>
