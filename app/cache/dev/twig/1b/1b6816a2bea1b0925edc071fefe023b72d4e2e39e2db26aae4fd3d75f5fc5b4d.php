<?php

/* IMAGLdapBundle:Default:login.html.twig */
class __TwigTemplate_4f4fb8aacf3a779586623773680b211cf5dd7dcd08349f059cd7aa4717151f56 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        // line 1
        $this->parent = $this->loadTemplate("IMAGLdapBundle::layout.html.twig", "IMAGLdapBundle:Default:login.html.twig", 1);
        $this->blocks = array(
            'imag_ldap_content' => array($this, 'block_imag_ldap_content'),
        );
    }

    protected function doGetParent(array $context)
    {
        return "IMAGLdapBundle::layout.html.twig";
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_3c5ea3e503400c1258d0d1dc345a524d6a38f3673f01503c6a7f19df86ad734c = $this->env->getExtension("native_profiler");
        $__internal_3c5ea3e503400c1258d0d1dc345a524d6a38f3673f01503c6a7f19df86ad734c->enter($__internal_3c5ea3e503400c1258d0d1dc345a524d6a38f3673f01503c6a7f19df86ad734c_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "IMAGLdapBundle:Default:login.html.twig"));

        $this->parent->display($context, array_merge($this->blocks, $blocks));
        
        $__internal_3c5ea3e503400c1258d0d1dc345a524d6a38f3673f01503c6a7f19df86ad734c->leave($__internal_3c5ea3e503400c1258d0d1dc345a524d6a38f3673f01503c6a7f19df86ad734c_prof);

    }

    // line 3
    public function block_imag_ldap_content($context, array $blocks = array())
    {
        $__internal_831bd0305c5579be2d36bbd10a3c837689e60d4b2c57e9e629d46992fbd9115d = $this->env->getExtension("native_profiler");
        $__internal_831bd0305c5579be2d36bbd10a3c837689e60d4b2c57e9e629d46992fbd9115d->enter($__internal_831bd0305c5579be2d36bbd10a3c837689e60d4b2c57e9e629d46992fbd9115d_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "imag_ldap_content"));

        // line 4
        echo "    ";
        if ((isset($context["error"]) ? $context["error"] : $this->getContext($context, "error"))) {
            // line 5
            echo "        <div>";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["error"]) ? $context["error"] : $this->getContext($context, "error")), "message", array()), "html", null, true);
            echo "</div>
    ";
        }
        // line 7
        echo "
    <form action=\"";
        // line 8
        echo $this->env->getExtension('routing')->getPath("login_check");
        echo "\" method=\"post\">
        <label for=\"username\">Username:</label>
        <input type=\"text\" id=\"username\" name=\"_username\" value=\"";
        // line 10
        echo twig_escape_filter($this->env, (isset($context["last_username"]) ? $context["last_username"] : $this->getContext($context, "last_username")), "html", null, true);
        echo "\" />

        <label for=\"password\">Password:</label>
        <input type=\"password\" id=\"password\" name=\"_password\" />

        ";
        // line 19
        echo "
        <input type=\"hidden\" name=\"_csrf_token\" value=\"";
        // line 20
        echo twig_escape_filter($this->env, (isset($context["token"]) ? $context["token"] : $this->getContext($context, "token")), "html", null, true);
        echo "\" />
        <input type=\"submit\" name=\"login\" />
    </form>
";
        
        $__internal_831bd0305c5579be2d36bbd10a3c837689e60d4b2c57e9e629d46992fbd9115d->leave($__internal_831bd0305c5579be2d36bbd10a3c837689e60d4b2c57e9e629d46992fbd9115d_prof);

    }

    public function getTemplateName()
    {
        return "IMAGLdapBundle:Default:login.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  68 => 20,  65 => 19,  57 => 10,  52 => 8,  49 => 7,  43 => 5,  40 => 4,  34 => 3,  11 => 1,);
    }
}
/* {% extends "IMAGLdapBundle::layout.html.twig" %}*/
/* */
/* {% block imag_ldap_content %}*/
/*     {% if error %}*/
/*         <div>{{ error.message }}</div>*/
/*     {% endif %}*/
/* */
/*     <form action="{{ path('login_check') }}" method="post">*/
/*         <label for="username">Username:</label>*/
/*         <input type="text" id="username" name="_username" value="{{ last_username }}" />*/
/* */
/*         <label for="password">Password:</label>*/
/*         <input type="password" id="password" name="_password" />*/
/* */
/*         {#*/
/*         If you want to control the URL the user is redirected to on success (more details below)*/
/*         <input type="hidden" name="_target_path" value="/account" />*/
/*         #}*/
/* */
/*         <input type="hidden" name="_csrf_token" value="{{ token }}" />*/
/*         <input type="submit" name="login" />*/
/*     </form>*/
/* {% endblock %}*/
