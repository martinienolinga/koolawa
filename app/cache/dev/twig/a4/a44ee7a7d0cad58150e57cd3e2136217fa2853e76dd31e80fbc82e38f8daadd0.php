<?php

/* ::base.html.twig */
class __TwigTemplate_e66dc5b90a60313c1f556da37131fe135bf7ac30b520547d9e93926b455ada01 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
            'title' => array($this, 'block_title'),
            'stylesheets' => array($this, 'block_stylesheets'),
            'body' => array($this, 'block_body'),
            'javascripts' => array($this, 'block_javascripts'),
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_f467b2462a6848155a388e763a7928f5bb6acbe1ae011ccd05fa56c9b432dcc4 = $this->env->getExtension("native_profiler");
        $__internal_f467b2462a6848155a388e763a7928f5bb6acbe1ae011ccd05fa56c9b432dcc4->enter($__internal_f467b2462a6848155a388e763a7928f5bb6acbe1ae011ccd05fa56c9b432dcc4_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "::base.html.twig"));

        // line 1
        echo "<!DOCTYPE html>
<html>
    <head>
        <meta charset=\"UTF-8\" />
        <title>";
        // line 5
        $this->displayBlock('title', $context, $blocks);
        echo "</title>
        ";
        // line 6
        $this->displayBlock('stylesheets', $context, $blocks);
        // line 7
        echo "        <link rel=\"icon\" type=\"image/x-icon\" href=\"";
        echo twig_escape_filter($this->env, $this->env->getExtension('asset')->getAssetUrl("favicon.ico"), "html", null, true);
        echo "\" />
    </head>
    <body>
        ";
        // line 10
        $this->displayBlock('body', $context, $blocks);
        // line 11
        echo "        ";
        $this->displayBlock('javascripts', $context, $blocks);
        // line 12
        echo "    </body>
</html>
";
        
        $__internal_f467b2462a6848155a388e763a7928f5bb6acbe1ae011ccd05fa56c9b432dcc4->leave($__internal_f467b2462a6848155a388e763a7928f5bb6acbe1ae011ccd05fa56c9b432dcc4_prof);

    }

    // line 5
    public function block_title($context, array $blocks = array())
    {
        $__internal_e5ce74b27db1c8d72dec376135e7ff4afd64ca13665116a4f35c1ef032c111fd = $this->env->getExtension("native_profiler");
        $__internal_e5ce74b27db1c8d72dec376135e7ff4afd64ca13665116a4f35c1ef032c111fd->enter($__internal_e5ce74b27db1c8d72dec376135e7ff4afd64ca13665116a4f35c1ef032c111fd_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "title"));

        echo "Welcome!";
        
        $__internal_e5ce74b27db1c8d72dec376135e7ff4afd64ca13665116a4f35c1ef032c111fd->leave($__internal_e5ce74b27db1c8d72dec376135e7ff4afd64ca13665116a4f35c1ef032c111fd_prof);

    }

    // line 6
    public function block_stylesheets($context, array $blocks = array())
    {
        $__internal_7c77755bf0582e01f9954a4160ee58c5a7099b905f106e0b403361538430ed22 = $this->env->getExtension("native_profiler");
        $__internal_7c77755bf0582e01f9954a4160ee58c5a7099b905f106e0b403361538430ed22->enter($__internal_7c77755bf0582e01f9954a4160ee58c5a7099b905f106e0b403361538430ed22_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "stylesheets"));

        
        $__internal_7c77755bf0582e01f9954a4160ee58c5a7099b905f106e0b403361538430ed22->leave($__internal_7c77755bf0582e01f9954a4160ee58c5a7099b905f106e0b403361538430ed22_prof);

    }

    // line 10
    public function block_body($context, array $blocks = array())
    {
        $__internal_b800a183465fd4e3182f937caa29c771934a9b2093c81740e179d800ef330caf = $this->env->getExtension("native_profiler");
        $__internal_b800a183465fd4e3182f937caa29c771934a9b2093c81740e179d800ef330caf->enter($__internal_b800a183465fd4e3182f937caa29c771934a9b2093c81740e179d800ef330caf_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "body"));

        
        $__internal_b800a183465fd4e3182f937caa29c771934a9b2093c81740e179d800ef330caf->leave($__internal_b800a183465fd4e3182f937caa29c771934a9b2093c81740e179d800ef330caf_prof);

    }

    // line 11
    public function block_javascripts($context, array $blocks = array())
    {
        $__internal_b1d3b4a51240fc23409d497085939863e06e0a53b76c8e84afac1ffeda92d1d0 = $this->env->getExtension("native_profiler");
        $__internal_b1d3b4a51240fc23409d497085939863e06e0a53b76c8e84afac1ffeda92d1d0->enter($__internal_b1d3b4a51240fc23409d497085939863e06e0a53b76c8e84afac1ffeda92d1d0_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "javascripts"));

        
        $__internal_b1d3b4a51240fc23409d497085939863e06e0a53b76c8e84afac1ffeda92d1d0->leave($__internal_b1d3b4a51240fc23409d497085939863e06e0a53b76c8e84afac1ffeda92d1d0_prof);

    }

    public function getTemplateName()
    {
        return "::base.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  93 => 11,  82 => 10,  71 => 6,  59 => 5,  50 => 12,  47 => 11,  45 => 10,  38 => 7,  36 => 6,  32 => 5,  26 => 1,);
    }
}
/* <!DOCTYPE html>*/
/* <html>*/
/*     <head>*/
/*         <meta charset="UTF-8" />*/
/*         <title>{% block title %}Welcome!{% endblock %}</title>*/
/*         {% block stylesheets %}{% endblock %}*/
/*         <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}" />*/
/*     </head>*/
/*     <body>*/
/*         {% block body %}{% endblock %}*/
/*         {% block javascripts %}{% endblock %}*/
/*     </body>*/
/* </html>*/
/* */
