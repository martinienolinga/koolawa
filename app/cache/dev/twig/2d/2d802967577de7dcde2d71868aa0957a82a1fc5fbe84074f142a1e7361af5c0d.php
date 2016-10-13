<?php

/* KoolawaAppsBundle:Security:login.html.twig */
class __TwigTemplate_3e302231301a236c5c834a673f4f3b29a6d40ebc685f3f93e8f4c0b08b6ed0b2 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        // line 3
        $this->parent = $this->loadTemplate("KoolawaCoreBundle::layout.html.twig", "KoolawaAppsBundle:Security:login.html.twig", 3);
        $this->blocks = array(
            'body' => array($this, 'block_body'),
        );
    }

    protected function doGetParent(array $context)
    {
        return "KoolawaCoreBundle::layout.html.twig";
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_67feec1480b03d2601aa67729fa828e877437edee8aee79e89f97d47ad7167af = $this->env->getExtension("native_profiler");
        $__internal_67feec1480b03d2601aa67729fa828e877437edee8aee79e89f97d47ad7167af->enter($__internal_67feec1480b03d2601aa67729fa828e877437edee8aee79e89f97d47ad7167af_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "KoolawaAppsBundle:Security:login.html.twig"));

        $this->parent->display($context, array_merge($this->blocks, $blocks));
        
        $__internal_67feec1480b03d2601aa67729fa828e877437edee8aee79e89f97d47ad7167af->leave($__internal_67feec1480b03d2601aa67729fa828e877437edee8aee79e89f97d47ad7167af_prof);

    }

    // line 5
    public function block_body($context, array $blocks = array())
    {
        $__internal_c7d53957ff92d06a599467d7b85af89cff17dee122a263cfcd968528f0c597cc = $this->env->getExtension("native_profiler");
        $__internal_c7d53957ff92d06a599467d7b85af89cff17dee122a263cfcd968528f0c597cc->enter($__internal_c7d53957ff92d06a599467d7b85af89cff17dee122a263cfcd968528f0c597cc_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "body"));

        // line 6
        echo "
  ";
        // line 7
        if (isset($context['assetic']['debug']) && $context['assetic']['debug']) {
            // asset "53ea678_0"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_53ea678_0") : $this->env->getExtension('asset')->getAssetUrl("css/53ea678_koolawa_1.css");
            // line 11
            echo "  <link rel=\"stylesheet\" href=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\" />
  ";
            // asset "53ea678_1"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_53ea678_1") : $this->env->getExtension('asset')->getAssetUrl("css/53ea678_icones_2.css");
            echo "  <link rel=\"stylesheet\" href=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\" />
  ";
            // asset "53ea678_2"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_53ea678_2") : $this->env->getExtension('asset')->getAssetUrl("css/53ea678_security_3.css");
            echo "  <link rel=\"stylesheet\" href=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\" />
  ";
        } else {
            // asset "53ea678"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_53ea678") : $this->env->getExtension('asset')->getAssetUrl("css/53ea678.css");
            echo "  <link rel=\"stylesheet\" href=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\" />
  ";
        }
        unset($context["asset_url"]);
        // line 13
        echo "
  ";
        // line 14
        if (isset($context['assetic']['debug']) && $context['assetic']['debug']) {
            // asset "a82aae1_0"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_a82aae1_0") : $this->env->getExtension('asset')->getAssetUrl("js/a82aae1_part_1_global_1.js");
            // line 15
            echo "  <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
  ";
            // asset "a82aae1_1"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_a82aae1_1") : $this->env->getExtension('asset')->getAssetUrl("js/a82aae1_part_1_loginform_2.js");
            echo "  <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
  ";
            // asset "a82aae1_2"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_a82aae1_2") : $this->env->getExtension('asset')->getAssetUrl("js/a82aae1_part_1_symfony_3.js");
            echo "  <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
  ";
        } else {
            // asset "a82aae1"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_a82aae1") : $this->env->getExtension('asset')->getAssetUrl("js/a82aae1.js");
            echo "  <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
  ";
        }
        unset($context["asset_url"]);
        // line 17
        echo "
  <script type=\"text/javascript\">
    var _locale = '";
        // line 19
        echo twig_escape_filter($this->env, (isset($context["_locale"]) ? $context["_locale"] : $this->getContext($context, "_locale")), "html", null, true);
        echo "';
    var _script_name = '";
        // line 20
        echo twig_escape_filter($this->env, (isset($context["_script_name"]) ? $context["_script_name"] : $this->getContext($context, "_script_name")), "html", null, true);
        echo "';
    var _request_scheme = '";
        // line 21
        echo twig_escape_filter($this->env, (isset($context["_request_scheme"]) ? $context["_request_scheme"] : $this->getContext($context, "_request_scheme")), "html", null, true);
        echo "';
    var _http_host = '";
        // line 22
        echo twig_escape_filter($this->env, (isset($context["_http_host"]) ? $context["_http_host"] : $this->getContext($context, "_http_host")), "html", null, true);
        echo "';
  </script>

  <input id=\"_error_message\" type=\"hidden\" value=\"";
        // line 25
        if ((isset($context["error"]) ? $context["error"] : $this->getContext($context, "error"))) {
            echo twig_escape_filter($this->env, $this->env->getExtension('translator')->trans($this->getAttribute((isset($context["error"]) ? $context["error"] : $this->getContext($context, "error")), "message", array())), "html", null, true);
        }
        echo "\" />
  <input id=\"_last_username\" type=\"hidden\" value=\"";
        // line 26
        echo twig_escape_filter($this->env, (isset($context["last_username"]) ? $context["last_username"] : $this->getContext($context, "last_username")), "html", null, true);
        echo "\" />
  <input type=\"hidden\" id=\"csrf_token\" value=\"";
        // line 27
        echo twig_escape_filter($this->env, (isset($context["token"]) ? $context["token"] : $this->getContext($context, "token")), "html", null, true);
        echo "\" />

";
        
        $__internal_c7d53957ff92d06a599467d7b85af89cff17dee122a263cfcd968528f0c597cc->leave($__internal_c7d53957ff92d06a599467d7b85af89cff17dee122a263cfcd968528f0c597cc_prof);

    }

    public function getTemplateName()
    {
        return "KoolawaAppsBundle:Security:login.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  138 => 27,  134 => 26,  128 => 25,  122 => 22,  118 => 21,  114 => 20,  110 => 19,  106 => 17,  80 => 15,  76 => 14,  73 => 13,  47 => 11,  43 => 7,  40 => 6,  34 => 5,  11 => 3,);
    }
}
/* {# src/Koolawa/AppsBundle/Resources/views/Security/login.html.twig #}*/
/* */
/* {% extends "KoolawaCoreBundle::layout.html.twig" %}*/
/* */
/* {% block body %}*/
/* */
/*   {% stylesheets '@KoolawaAppsBundle/Resources/public/css/koolawa.css'*/
/*                  '@KoolawaAppsBundle/Resources/public/css/icones.css' */
/*                  '@KoolawaAppsBundle/Resources/public/css/security.css' */
/*   filter='cssrewrite, yui_css' %}*/
/*   <link rel="stylesheet" href="{{ asset_url }}" />*/
/*   {% endstylesheets %}*/
/* */
/*   {% javascripts '@KoolawaAppsBundle/Resources/public/js/*.js' filter='yui_js' %}*/
/*   <script type="text/javascript" src="{{ asset_url }}"></script>*/
/*   {% endjavascripts %}*/
/* */
/*   <script type="text/javascript">*/
/*     var _locale = '{{ _locale }}';*/
/*     var _script_name = '{{ _script_name }}';*/
/*     var _request_scheme = '{{ _request_scheme }}';*/
/*     var _http_host = '{{ _http_host }}';*/
/*   </script>*/
/* */
/*   <input id="_error_message" type="hidden" value="{% if error %}{{ error.message|trans }}{% endif %}" />*/
/*   <input id="_last_username" type="hidden" value="{{ last_username }}" />*/
/*   <input type="hidden" id="csrf_token" value="{{ token }}" />*/
/* */
/* {% endblock %}*/
/* */
