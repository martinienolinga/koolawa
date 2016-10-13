<?php

namespace Koolawa\AppsBundle\EventListener;

//use Symfony\Component\EventDispatcher\EventSubscriberInterface;
//use IMAG\LdapBundle\Event\LdapUserEvent;

use Koolawa\AppsBundle\Entity\User;
use Symfony\Bridge\Doctrine\RegistryInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use IMAG\LdapBundle\Event\LdapEvents;
use IMAG\LdapBundle\Event\LdapUserEvent;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\User\UserInterface;



/**
 * Performs logic before the user is found to LDAP
 */
class LdapSecuritySubscriber implements EventSubscriberInterface
{
    /**
     * @var \Symfony\Bridge\Doctrine\RegistryInterface
     */
    private $doctrine;

    public function __construct(RegistryInterface $doctrine)
    {
        $this->doctrine = $doctrine;
    }

    public static function getSubscribedEvents()
    {
        return array(
            \IMAG\LdapBundle\Event\LdapEvents::PRE_BIND => 'onPreBind',
        );
    }

    /**
     * Modifies the User before binding data from LDAP
     *
     * @param \IMAG\LdapBundle\Event\LdapUserEvent $event
     */
    public function onPreBind(LdapUserEvent $event)
    {
        //error_log("Grosse bourde !2", 3, "/tmp/test.log");
        //var_dump($form); die();

        $user = $event->getUser();
        /*$config = $this->appContext->getConfig();

        $ldapConf = $config['ldap'];

        if (!in_array($user->getUsername(), $ldapConf['allowed'])) {
            throw new \Exception(sprintf('LDAP user %s not allowed', $user->getUsername()));
        }*/

        $this->userAccessAllowed($user);

        //print_r($user); die();

        $user->addRole('ROLE_LDAP');
        #$user->addRole('ROLE_ADMIN');
        #$user->addRole('IS_AUTHENTICATED_ANONYMOUSLY');
        #$user->addRole('ROLE_SUPER_COOL');
        $event->setUser($user);
    }

    /**
     * Check if user authenticating is in the white-list of users the administrators
     * have set as allowing access.
     *
     * @param UserInterface $user
     * @return bool
     * @throws \Symfony\Component\Security\Core\Exception\AuthenticationException
     */
    private function userAccessAllowed(UserInterface $user)
    {
        $username = $user->getUsername();
        $userAccess = $this->doctrine->getRepository('KoolawaAppsBundle:User')
            ->loadUserByLdapUsername($username);

        if (!$userAccess instanceof User) {
            $message = sprintf('User with username "%s" is not in the list of users allowed access.', $username);
            throw new AuthenticationException($message);
        }

        return true;
    }
}
