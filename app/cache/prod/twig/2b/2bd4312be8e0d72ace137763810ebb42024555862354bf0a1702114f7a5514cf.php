<?php

/* @Twig/Exception/exception_full.html.twig */
class __TwigTemplate_a3689c4f765dba61da301e0c90be6ef3c0b1d20b23328b69047afe66a3c2d8e5 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        // line 1
        $this->parent = $this->loadTemplate("@Twig/layout.html.twig", "@Twig/Exception/exception_full.html.twig", 1);
        $this->blocks = array(
            'head' => array($this, 'block_head'),
            'title' => array($this, 'block_title'),
            'body' => array($this, 'block_body'),
        );
    }

    protected function doGetParent(array $context)
    {
        return "@Twig/layout.html.twig";
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_3cf230409679b464942b3c29c96e5ad14046b40ce6bce6be205d5358174b410b = $this->env->getExtension("native_profiler");
        $__internal_3cf230409679b464942b3c29c96e5ad14046b40ce6bce6be205d5358174b410b->enter($__internal_3cf230409679b464942b3c29c96e5ad14046b40ce6bce6be205d5358174b410b_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@Twig/Exception/exception_full.html.twig"));

        $this->parent->display($context, array_merge($this->blocks, $blocks));
        
        $__internal_3cf230409679b464942b3c29c96e5ad14046b40ce6bce6be205d5358174b410b->leave($__internal_3cf230409679b464942b3c29c96e5ad14046b40ce6bce6be205d5358174b410b_prof);

    }

    // line 3
    public function block_head($context, array $blocks = array())
    {
        $__internal_c948ac4b2cd2f8cf0b94abc1c1258dcfcacbd257777dcd5ff17c08cfe6310149 = $this->env->getExtension("native_profiler");
        $__internal_c948ac4b2cd2f8cf0b94abc1c1258dcfcacbd257777dcd5ff17c08cfe6310149->enter($__internal_c948ac4b2cd2f8cf0b94abc1c1258dcfcacbd257777dcd5ff17c08cfe6310149_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "head"));

        // line 4
        echo "    <link href=\"";
        echo twig_escape_filter($this->env, $this->env->getExtension('request')->generateAbsoluteUrl($this->env->getExtension('asset')->getAssetUrl("bundles/framework/css/exception.css")), "html", null, true);
        echo "\" rel=\"stylesheet\" type=\"text/css\" media=\"all\" />
";
        
        $__internal_c948ac4b2cd2f8cf0b94abc1c1258dcfcacbd257777dcd5ff17c08cfe6310149->leave($__internal_c948ac4b2cd2f8cf0b94abc1c1258dcfcacbd257777dcd5ff17c08cfe6310149_prof);

    }

    // line 7
    public function block_title($context, array $blocks = array())
    {
        $__internal_d06d7f1c1b4e974a8672984ce301cc51891b456bd786f8b6ece0ed92aac74f51 = $this->env->getExtension("native_profiler");
        $__internal_d06d7f1c1b4e974a8672984ce301cc51891b456bd786f8b6ece0ed92aac74f51->enter($__internal_d06d7f1c1b4e974a8672984ce301cc51891b456bd786f8b6ece0ed92aac74f51_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "title"));

        // line 8
        echo "    ";
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["exception"]) ? $context["exception"] : $this->getContext($context, "exception")), "message", array()), "html", null, true);
        echo " (";
        echo twig_escape_filter($this->env, (isset($context["status_code"]) ? $context["status_code"] : $this->getContext($context, "status_code")), "html", null, true);
        echo " ";
        echo twig_escape_filter($this->env, (isset($context["status_text"]) ? $context["status_text"] : $this->getContext($context, "status_text")), "html", null, true);
        echo ")
";
        
        $__internal_d06d7f1c1b4e974a8672984ce301cc51891b456bd786f8b6ece0ed92aac74f51->leave($__internal_d06d7f1c1b4e974a8672984ce301cc51891b456bd786f8b6ece0ed92aac74f51_prof);

    }

    // line 11
    public function block_body($context, array $blocks = array())
    {
        $__internal_70788d908a677485820657cd127b60840c0550f97186f775af5d0eacedd3eedf = $this->env->getExtension("native_profiler");
        $__internal_70788d908a677485820657cd127b60840c0550f97186f775af5d0eacedd3eedf->enter($__internal_70788d908a677485820657cd127b60840c0550f97186f775af5d0eacedd3eedf_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "body"));

        // line 12
        echo "    ";
        $this->loadTemplate("@Twig/Exception/exception.html.twig", "@Twig/Exception/exception_full.html.twig", 12)->display($context);
        
        $__internal_70788d908a677485820657cd127b60840c0550f97186f775af5d0eacedd3eedf->leave($__internal_70788d908a677485820657cd127b60840c0550f97186f775af5d0eacedd3eedf_prof);

    }

    public function getTemplateName()
    {
        return "@Twig/Exception/exception_full.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  78 => 12,  72 => 11,  58 => 8,  52 => 7,  42 => 4,  36 => 3,  11 => 1,);
    }
}
/* {% extends '@Twig/layout.html.twig' %}*/
/* */
/* {% block head %}*/
/*     <link href="{{ absolute_url(asset('bundles/framework/css/exception.css')) }}" rel="stylesheet" type="text/css" media="all" />*/
/* {% endblock %}*/
/* */
/* {% block title %}*/
/*     {{ exception.message }} ({{ status_code }} {{ status_text }})*/
/* {% endblock %}*/
/* */
/* {% block body %}*/
/*     {% include '@Twig/Exception/exception.html.twig' %}*/
/* {% endblock %}*/
/* */
