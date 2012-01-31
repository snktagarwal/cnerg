<?php
class People_model extends CI_Model {

	public function __construct()
	{
		$this->load->database();
	}

	public function get_people()
	{
		
		$this->db->select('people.affiliation');
		$this->db->from('people');
		$this->db->group_by('people.affiliation');
		
		$query = $this->db->get();
		$affiliation_list = $query->result_array();
		
		$people = null;

		foreach($affiliation_list as $affiliation){
			$this->db->select('*');
			$this->db->from('people');
			$this->db->where('affiliation',$affiliation['affiliation']);
			$people[$affiliation['affiliation']] = $this->db->get()->result_array();
		}
			
		return $people;
		
	}
}
?>