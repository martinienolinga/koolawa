<?php

namespace Koolawa\AppsBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Rule
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Koolawa\AppsBundle\Entity\RuleRepository")
 */
class Rule
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var boolean
     *
     * @ORM\Column(name="welcomeDisplay", type="boolean")
     */
    private $welcomeDisplay;

    /**
     * @var boolean
     *
     * @ORM\Column(name="userDisplay", type="boolean")
     */
    private $userDisplay;

    /**
     * @var boolean
     *
     * @ORM\Column(name="userCreate", type="boolean")
     */
    private $userCreate;

    /**
     * @var boolean
     *
     * @ORM\Column(name="userUpdate", type="boolean")
     */
    private $userUpdate;

    /**
     * @var boolean
     *
     * @ORM\Column(name="userDelete", type="boolean")
     */
    private $userDelete;

    /**
     * @var boolean
     *
     * @ORM\Column(name="userGroupCreate", type="boolean")
     */
    private $userGroupCreate;

    /**
     * @var boolean
     *
     * @ORM\Column(name="userGroupUpdate", type="boolean")
     */
    private $userGroupUpdate;

    /**
     * @var boolean
     *
     * @ORM\Column(name="userGroupDelete", type="boolean")
     */
    private $userGroupDelete;

    /**
     * @var boolean
     *
     * @ORM\Column(name="userForceDisplay", type="boolean")
     */
    private $userForceDisplay;

    /**
     * @var boolean
     *
     * @ORM\Column(name="settingDisplay", type="boolean")
     */
    private $settingDisplay;

    /**
     * @var boolean
     *
     * @ORM\Column(name="settingUpdate", type="boolean")
     */
    private $settingUpdate;

    /**
     * @var boolean
     *
     * @ORM\Column(name="userEnabled", type="boolean")
     */
    private $userEnabled;

    /**
     * @var boolean
     *
     * @ORM\Column(name="userDisplayLog", type="boolean")
     */
    private $userDisplayLog;

    /**
     * @var boolean
     *
     * @ORM\Column(name="settingDisplayLog", type="boolean")
     */
    private $settingDisplayLog;

    /**
     * @var integer
     *
     * @ORM\Column(name="sessionInactiveDelay", type="integer")
     */
    private $sessionInactiveDelay;

    /**
     * @var boolean
     *
     * @ORM\Column(name="settingPasswordCanChange", type="boolean")
     */
    private $settingPasswordCanChange;
    
    /**
     * @var integer
     *
     * @ORM\Column(name="userid", type="integer")
     */
    private $userid;
    
    /**
     * @var integer
     *
     * @ORM\Column(name="usergroupid", type="integer")
     */
    private $usergroupid;
    
    
    public function __construct()
    {
    	$this->welcomeDisplay = true;

    	$this->userDisplay = true;
    	$this->userCreate = true;
    	$this->userUpdate = true;
    	$this->userDelete = false;
    	$this->userGroupCreate = true;
    	$this->userGroupUpdate = true;
    	$this->userGroupDelete = false;
    	$this->userForceDisplay = true;

    	$this->settingDisplay = true;
    	$this->settingUpdate = true;

    	$this->userEnabled = true;
    	$this->userDisplayLog = false;
    	$this->settingDisplayLog = false;
    	$this->sessionInactiveDelay = 3600;
    	$this->settingPasswordCanChange = true;
    	
    	$this->userid = 0;
    	$this->usergroupid = 0;
    }


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set welcomeDisplay
     *
     * @param boolean $welcomeDisplay
     * @return Rule
     */
    public function setWelcomeDisplay($welcomeDisplay)
    {
        $this->welcomeDisplay = $welcomeDisplay;

        return $this;
    }

    /**
     * Get welcomeDisplay
     *
     * @return boolean 
     */
    public function getWelcomeDisplay()
    {
        return $this->welcomeDisplay;
    }

    /**
     * Set userDisplay
     *
     * @param boolean $userDisplay
     * @return Rule
     */
    public function setUserDisplay($userDisplay)
    {
        $this->userDisplay = $userDisplay;

        return $this;
    }

    /**
     * Get userDisplay
     *
     * @return boolean 
     */
    public function getUserDisplay()
    {
        return $this->userDisplay;
    }

    /**
     * Set userCreate
     *
     * @param boolean $userCreate
     * @return Rule
     */
    public function setUserCreate($userCreate)
    {
        $this->userCreate = $userCreate;

        return $this;
    }

    /**
     * Get userCreate
     *
     * @return boolean 
     */
    public function getUserCreate()
    {
        return $this->userCreate;
    }

    /**
     * Set userUpdate
     *
     * @param boolean $userUpdate
     * @return Rule
     */
    public function setUserUpdate($userUpdate)
    {
        $this->userUpdate = $userUpdate;

        return $this;
    }

    /**
     * Get userUpdate
     *
     * @return boolean 
     */
    public function getUserUpdate()
    {
        return $this->userUpdate;
    }

    /**
     * Set userDelete
     *
     * @param boolean $userDelete
     * @return Rule
     */
    public function setUserDelete($userDelete)
    {
        $this->userDelete = $userDelete;

        return $this;
    }

    /**
     * Get userDelete
     *
     * @return boolean 
     */
    public function getUserDelete()
    {
        return $this->userDelete;
    }

    /**
     * Set userGroupCreate
     *
     * @param boolean $userGroupCreate
     * @return Rule
     */
    public function setUserGroupCreate($userGroupCreate)
    {
        $this->userGroupCreate = $userGroupCreate;

        return $this;
    }

    /**
     * Get userGroupCreate
     *
     * @return boolean 
     */
    public function getUserGroupCreate()
    {
        return $this->userGroupCreate;
    }

    /**
     * Set userGroupUpdate
     *
     * @param boolean $userGroupUpdate
     * @return Rule
     */
    public function setUserGroupUpdate($userGroupUpdate)
    {
        $this->userGroupUpdate = $userGroupUpdate;

        return $this;
    }

    /**
     * Get userGroupUpdate
     *
     * @return boolean 
     */
    public function getUserGroupUpdate()
    {
        return $this->userGroupUpdate;
    }

    /**
     * Set userGroupDelete
     *
     * @param boolean $userGroupDelete
     * @return Rule
     */
    public function setUserGroupDelete($userGroupDelete)
    {
        $this->userGroupDelete = $userGroupDelete;

        return $this;
    }

    /**
     * Get userGroupDelete
     *
     * @return boolean 
     */
    public function getUserGroupDelete()
    {
        return $this->userGroupDelete;
    }

    /**
     * Set userForceDisplay
     *
     * @param boolean $userForceDisplay
     * @return Rule
     */
    public function setUserForceDisplay($userForceDisplay)
    {
        $this->userForceDisplay = $userForceDisplay;

        return $this;
    }

    /**
     * Get userForceDisplay
     *
     * @return boolean 
     */
    public function getUserForceDisplay()
    {
        return $this->userForceDisplay;
    }

    /**
     * Set settingDisplay
     *
     * @param boolean $settingDisplay
     * @return Rule
     */
    public function setSettingDisplay($settingDisplay)
    {
        $this->settingDisplay = $settingDisplay;

        return $this;
    }

    /**
     * Get settingDisplay
     *
     * @return boolean 
     */
    public function getSettingDisplay()
    {
        return $this->settingDisplay;
    }

    /**
     * Set settingUpdate
     *
     * @param boolean $settingUpdate
     * @return Rule
     */
    public function setSettingUpdate($settingUpdate)
    {
        $this->settingUpdate = $settingUpdate;

        return $this;
    }

    /**
     * Get settingUpdate
     *
     * @return boolean 
     */
    public function getSettingUpdate()
    {
        return $this->settingUpdate;
    }

    /**
     * Set userEnabled
     *
     * @param boolean $userEnabled
     * @return Rule
     */
    public function setUserEnabled($userEnabled)
    {
        $this->userEnabled = $userEnabled;

        return $this;
    }

    /**
     * Get userEnabled
     *
     * @return boolean 
     */
    public function getUserEnabled()
    {
        return $this->userEnabled;
    }

    /**
     * Set userDisplayLog
     *
     * @param boolean $userDisplayLog
     * @return Rule
     */
    public function setUserDisplayLog($userDisplayLog)
    {
        $this->userDisplayLog = $userDisplayLog;

        return $this;
    }

    /**
     * Get userDisplayLog
     *
     * @return boolean 
     */
    public function getUserDisplayLog()
    {
        return $this->userDisplayLog;
    }

    /**
     * Set settingDisplayLog
     *
     * @param boolean $settingDisplayLog
     * @return Rule
     */
    public function setSettingDisplayLog($settingDisplayLog)
    {
        $this->settingDisplayLog = $settingDisplayLog;

        return $this;
    }

    /**
     * Get settingDisplayLog
     *
     * @return boolean 
     */
    public function getSettingDisplayLog()
    {
        return $this->settingDisplayLog;
    }

    /**
     * Set sessionInactiveDelay
     *
     * @param integer $sessionInactiveDelay
     * @return Rule
     */
    public function setSessionInactiveDelay($sessionInactiveDelay)
    {
        $this->sessionInactiveDelay = $sessionInactiveDelay;

        return $this;
    }

    /**
     * Get sessionInactiveDelay
     *
     * @return integer 
     */
    public function getSessionInactiveDelay()
    {
        return $this->sessionInactiveDelay;
    }

    /**
     * Set settingPasswordCanChange
     *
     * @param boolean $settingPasswordCanChange
     * @return Rule
     */
    public function setSettingPasswordCanChange($settingPasswordCanChange)
    {
        $this->settingPasswordCanChange = $settingPasswordCanChange;

        return $this;
    }

    /**
     * Get settingPasswordCanChange
     *
     * @return boolean 
     */
    public function getSettingPasswordCanChange()
    {
        return $this->settingPasswordCanChange;
    }

    /**
     * Set userid
     *
     * @param integer $userid
     * @return Rule
     */
    public function setUserid($userid)
    {
        $this->userid = $userid;

        return $this;
    }

    /**
     * Get userid
     *
     * @return integer 
     */
    public function getUserid()
    {
        return $this->userid;
    }

    /**
     * Set usergroupid
     *
     * @param integer $usergroupid
     * @return Rule
     */
    public function setUsergroupid($usergroupid)
    {
        $this->usergroupid = $usergroupid;

        return $this;
    }

    /**
     * Get usergroupid
     *
     * @return integer 
     */
    public function getUsergroupid()
    {
        return $this->usergroupid;
    }
}
